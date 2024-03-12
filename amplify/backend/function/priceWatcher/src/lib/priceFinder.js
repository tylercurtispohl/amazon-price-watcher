const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const findPrice = async (url) => {
  let browser;
  let page;

  try {
    // console.log("opening browser and page");
    browser = await puppeteer.launch();
    page = await browser.newPage();

    // console.log("navigating to URL");
    await page.goto(url, { waitUntil: ["domcontentloaded", "networkidle2"] });

    // console.log("loading page content into cheerio");
    // load the HTML into cheerio for DOM parsing
    const productPageHtml = await page.content();
    const productPageCheerio = cheerio.load(productPageHtml);

    // find the div containing the price
    const priceDiv = productPageCheerio("#corePrice_feature_div")[0];

    // inside that div is a span with the class "a-offscreen" containing the price
    let priceText = productPageCheerio(priceDiv)
      .find("span.a-offscreen")
      .text();

    if (!priceText) {
      // console.log("price cannot be found on product page - trying add to cart");
      // Sometimes Amazon doesn't display the price on the product page and instead
      // forces you to add the item to the cart to see the price.
      // So if we didn't find the price, click the "add to cart" button.
      let addToCartButton;

      try {
        addToCartButton = await page.waitForSelector(
          "#add-to-cart-button",
          10000
        );
      } catch (err) {
        return {
          message: `Price could not be found - could not find the "add to cart" button`,
        };
      }

      // console.log("clicking add to cart");
      await addToCartButton.click();
      // console.log("waiting for navigation");
      await page.waitForNavigation({ timeout: 10000 });

      // console.log("loading page content into cheerio");
      const cartPageHtml = await page.content();
      const cartCheerio = cheerio.load(cartPageHtml);

      const div = cartCheerio("#sw-subtotal")[0];
      priceText = cartCheerio(div).find("span.a-offscreen").text();
    }

    if (!priceText) {
      return {
        message: "Price could not be found",
      };
    }

    // The price usually has a dollar sign in front of it (e.g $32.93)
    // so strip out just the number
    const priceSubstring = priceText.match(/\d+\.\d{2}/g)[0];
    const price = Number(priceSubstring);
    // console.log(`Found price ${price}`);

    if (price && !isNaN(price)) {
      return {
        price,
      };
    }

    return {
      message: "Price could not be found",
    };
  } catch (err) {
    console.error(err);
    return {
      message: `Price could not be found due to error: ${err.message}`,
    };
  } finally {
    if (page) {
      page.close();
    }
    if (browser) {
      browser.close();
    }
  }
};

module.exports = {
  findPrice,
};
