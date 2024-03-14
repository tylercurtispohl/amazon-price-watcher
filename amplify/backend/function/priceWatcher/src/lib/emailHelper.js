const {
  createNotification,
  getProductSubscriptions,
  getLatestNotification,
} = require("./dbClient");
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
    const response = await sgMail.send(msg);
    console.log("Sendgrid response: ", response);
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
  const message = `The price of ${productName} dropped from $${oldPrice} to $${newPrice}! Go here to buy it: ${productUrl}`;

  await sendMessagesAndCreateNotifications(
    subscriptions,
    subject,
    message,
    "EMAIL_NEWPRICE"
  );
};

/**
 * Gets a set of product subscription IDs where there has been
 * at least one notification.
 * @param {ProductSubscription[]} subscriptions
 * @returns A set of subscription IDs
 */
const getHasNotificationSet = async (subscriptions) => {
  const hasNotificationSet = new Set();

  const promises = subscriptions.map(async (s) => {
    const latestNotification = await getLatestNotification(s.id);
    if (latestNotification?.length) {
      hasNotificationSet.add(s.id);
    }
  });

  await Promise.all(promises);

  return hasNotificationSet;
};

/**
 * Sends email notifications to all subscriptions of a product.
 * Sends both initial price and new price notifications.
 * @param {Product} product
 * @param {number} newPrice
 * @param {number} oldPrice
 */
const sendEmails = async (product, newPrice, oldPrice) => {
  console.log(`Sending emails for product: `, {
    ...product,
    newPrice,
    oldPrice,
  });

  sgMail.setApiKey(SENDGRID_API_KEY);

  // Filter the subscriptions to only send to enabled subscriptions
  const subscriptions = (await getProductSubscriptions(product.id)).filter(
    (s) => s.status === "CONFIGURED"
  );

  console.log(`Found ${subscriptions.length} subscriptions: `, subscriptions);

  const hasNotificationSet = await getHasNotificationSet(subscriptions);

  console.log("hasNotificationSet includes: ", hasNotificationSet);

  if (!subscriptions?.length) {
    console.log(`Product with id ${product.id} has no subscriptions.`);
    return;
  }

  // Send initial notifications to all subscriptions if oldPrice does not exist.
  // Otherwise, send only to subscriptions that have not had any notifications yet.
  const sendInitialEmailSubscriptions = subscriptions.filter(
    (s) => !oldPrice || !hasNotificationSet.has(s.id)
  );

  console.log(
    "Sending initial emails to subscriptions: ",
    sendInitialEmailSubscriptions
  );

  await sendInitialMessages(
    sendInitialEmailSubscriptions,
    product.name,
    product.url,
    newPrice
  );

  // Send new price notifications to all subscriptions if there is an old price
  // AND the new price is less than the old price AND they have already had notifications.
  const sendNewPriceSubscriptions = subscriptions.filter(
    (s) => oldPrice && newPrice < oldPrice && hasNotificationSet.has(s.id)
  );

  console.log(
    "Sending new price emails to subscriptions: ",
    sendNewPriceSubscriptions
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
