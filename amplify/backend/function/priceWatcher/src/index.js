const { findPrice } = require("./lib/priceFinder");
const {
  getProduct,
  updateProductStatus,
  createPricePoint,
  getLatestPricePoint,
} = require("./lib/dbClient");
const { sendEmails } = require("./lib/emailHelper");

/**
 * @type {import('@types/aws-lambda').SQSEvent}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  // There will likely only ever be one record in event.Records
  // but just in case we implement batching in the future, loop
  // through all the records.
  for (const record of event.Records) {
    const { productId } = JSON.parse(record.body);

    try {
      console.log(`Processing product with ID:${productId}`);

      const product = await getProduct(productId);

      if (!product) {
        console.log(`Could not find product with ID ${productId}`);
        continue;
      }

      if (product.status !== "CONFIGURED") {
        // We failed to scrape the product price at some point in the past.
        // Exit this iteration of the loop and continue with other messages
        console.log(
          `Product is in state ${product.status} - continuing with other products.`
        );
        continue;
      }

      // Find price on amazon
      const result = await findPrice(product.url);

      if (result.message) {
        // something went wrong while scraping the price.
        // update the database and exit this iteration of the loop
        await updateProductStatus(productId, "ERROR", result.message);
        console.log(
          `Something went wrong when scraping the product price. Message: ${result.message}`
        );
        continue;
      }

      const { price } = result;

      // Get the latest price BEFORE inserting any more price points to the database
      const latestPricePoint = await getLatestPricePoint(productId);
      const latestPrice = latestPricePoint?.price;

      await createPricePoint(productId, price);

      await sendEmails(product, price, latestPrice);
    } catch (err) {
      console.log(`Error processing product ID: ${productId}`);
      console.log(err);
    }
  }

  return {
    body: JSON.stringify({ message: "Success!" }),
  };
};
