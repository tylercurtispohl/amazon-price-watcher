const { createNotification, getProductSubscriptions } = require("./dbClient");
const sgMail = require("@sendgrid/mail");

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

/**
 * Send a single email to SendGrid
 * @param {string} email
 * @param {string} subject
 * @param {string} message
 */
const sendMessageToSendGrid = async (email, subject, message) => {
  const msg = {
    to: email,
    from: "tylerspricewatcher@gmail.com",
    replyTo: "tylerspricewatcher@gmail.com",
    subject: subject,
    text: message,
  };

  try {
    // TODO: Does sendgrid send 400 errors in a response OR will any errors cause
    // an exception? If they send errors in the response, we'll want to handle
    // that better here.
    await sgMail.send(msg);
  } catch (err) {
    console.log(
      `Something went wrong when sending an email to ${email}: `,
      err
    );
  }
};

/**
 * Send messages to all subscriptions and create a notification in the database
 * for each.
 * @param {ProductSubscription} subscriptions
 * @param {string} subject
 * @param {string} message
 * @param {string} notificationType
 */
const sendMessagesAndCreateNotifications = async (
  subscriptions,
  subject,
  message,
  notificationType
) => {
  const timestamp = new Date().toISOString();

  const sendEmailPromises = subscriptions.map(async (s) => {
    await sendMessageToSendGrid(s.email, subject, message);
  });

  await Promise.all(sendEmailPromises);

  const createNotificationPromises = subscriptions.map(async (s) => {
    await createNotification(s.id, timestamp, notificationType);
  });

  await Promise.all(createNotificationPromises);
};

/**
 * Sends initial price emails to all subscriptions
 * @param {ProductSubscription} subscriptions
 * @param {string} productName
 * @param {string} productUrl
 * @param {number} price
 */
const sendInitialMessages = async (
  subscriptions,
  productName,
  productUrl,
  price
) => {
  const subject = `Price of ${productName}`;
  const message = `The price of ${productName} is $${price}. Go here to buy it: ${productUrl}`;

  await sendMessagesAndCreateNotifications(
    subscriptions,
    subject,
    message,
    "EMAIL_INITIAL"
  );
};

/**
 * Sends new price emails to all subscriptions
 * @param {ProductSubscription} subscriptions
 * @param {string} productName
 * @param {string} productUrl
 * @param {number} newPrice
 * @param {number} oldPrice
 */
const sendNewPriceMessages = async (
  subscriptions,
  productName,
  productUrl,
  newPrice,
  oldPrice
) => {
  const subject = `Price drop on ${productName}!`;
  const message = `The price of ${productName} dropped from $${oldPrice} to $${newPrice}. Go here to buy it: ${productUrl}`;

  await sendMessagesAndCreateNotifications(
    subscriptions,
    subject,
    message,
    "EMAIL_NEWPRICE"
  );
};

/**
 * Sends email notifications to all subscriptions of a product.
 * Sends both initial price and new price notifications.
 * @param {Product} product
 * @param {number} newPrice
 * @param {number} oldPrice
 */
const sendEmails = async (product, newPrice, oldPrice) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const subscriptions = await getProductSubscriptions(product.id);

  if (!subscriptions?.length) {
    console.log(`Product with id ${product.id} has no subscriptions.`);
    return;
  }

  // Send initial notifications to all subscriptions if oldPrice does not exist.
  // Otherwise, send only to subscriptions that have not had any notifications yet.
  const sendInitialEmailSubscriptions = subscriptions.filter(
    (s) => !oldPrice || !s.notifications?.length
  );

  await sendInitialMessages(
    sendInitialEmailSubscriptions,
    product.name,
    product.url,
    newPrice
  );

  // Send new price notifications to all subscriptions if there is an old price
  // AND they have already had notifications.
  const sendNewPriceSubscriptions = subscriptions.filter(
    (s) => oldPrice && s.notifications?.length
  );

  await sendNewPriceMessages(
    sendNewPriceSubscriptions,
    product.name,
    product.url,
    newPrice,
    oldPrice
  );
};

module.exports = {
  sendEmails,
};
