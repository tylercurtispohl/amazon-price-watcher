// const sgMail = require("@sendgrid/mail");
const priceFinder = require("./lib/priceFinder");
const dbClient = require("./lib/dbClient");
const { SendMessageCommand, SQSClient } = require("@aws-sdk/client-sqs");

// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const client = new SQSClient({});
const QUEUE_URL = process.env.QUEUE_PRICEMESSENGER_QUEUEURL;

/**
 * @type {import('@types/aws-lambda').SQSEvent}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // sgMail.setApiKey(SENDGRID_API_KEY);

  for (const record of event.Records) {
    const { productId } = JSON.parse(record.body);

    try {
      console.log(`Processing product with ID:${productId}`);

      const product = await dbClient.getProduct(productId);

      // console.log("Found product:", product);

      // const pricePointList = await dbClient.listPricePoints(productId);
      // return {
      //   body: JSON.stringify({ message: "Success" }),
      // };

      if (product.status !== "CONFIGURED") {
        const message = `Product is in state ${product.status} - exiting function`;

        console.log(message);

        return {
          body: JSON.stringify({ message }),
        };
      }

      // Find price on amazon
      const result = await priceFinder.findPrice(product.url);

      if (result.message) {
        // something went wrong
        // update db and return
        dbClient.updateProductStatus(productId, "ERROR", result.message);

        return {
          body: JSON.stringify({ message: result.message }),
        };
      }

      const { price } = result;

      dbClient.createPricePoint(productId, price);

      // TODO: what do we do if there are no price points yet
      const latestPricePoint = await dbClient.getLatestPricePoint(productId);

      // if (!latestPricePoint) {
      //   // send an email with the initial price
      //   console.log("Sending initial price to all recipients");
      //   return {
      //     body: JSON.stringify({ message: "Initial price sent in email" }),
      //   };
      // }

      const latestPrice = latestPricePoint?.price;

      if (!latestPrice || price < latestPrice) {
        // send emails to all recipients
        console.log("Sending new price to all recipients");
        //   const msg = {
        //     to: "tylercurtispohl+pricewatcher@gmail.com",
        //     from: "tylerspricewatcher@gmail.com",
        //     replyTo: "tylerspricewatcher@gmail.com",
        //     subject: "Price Drop!",
        //     text: `The price of ${product.name} dropped from 2 to 1!`,
        //   };
        //   console.log("Sending email");
        //   const sgResponse = await sgMail.send(msg);
        //   console.log("SendGrid response:", sgResponse);
        const messageBody = {
          productId,
          productName: product.name,
          oldPrice: latestPrice,
          newPrice: price,
        };

        const command = new SendMessageCommand({
          QueueUrl: QUEUE_URL,
          DelaySeconds: 0,
          MessageBody: JSON.stringify(messageBody),
        });

        console.log("Sending message with body:", messageBody);

        const sendMessageResponse = await client.send(command);
        console.log("Sent Message. Response:", sendMessageResponse);

        return {
          body: JSON.stringify({ message: "New price sent in email" }),
        };
      }
    } catch (err) {
      console.log(`Error processing product ID: ${productId}`);
      console.log(err);
    }
  }

  return {
    body: JSON.stringify({ message: "Success!" }),
  };
};
