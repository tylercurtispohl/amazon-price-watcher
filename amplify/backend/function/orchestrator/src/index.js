// const SQS = require("@aws-sdk/client-sqs");
const { SendMessageCommand, SQSClient } = require("@aws-sdk/client-sqs");
const dbClient = require("./lib/dbClient");

const client = new SQSClient({});
const QUEUE_URL = process.env.QUEUE_PRICEWATCHER_QUEUEURL;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const products = await dbClient.getConfiguredProducts();

  console.log("Found products: ", products);

  for (const product of products) {
    console.log(`Sending message for product id: ${product.id}`);
    const messageBody = JSON.stringify({ productId: product.id });
    console.log(messageBody);

    const command = new SendMessageCommand({
      QueueUrl: QUEUE_URL,
      DelaySeconds: 0,
      MessageBody: messageBody,
    });

    const sendMessageResponse = await client.send(command);
    console.log(sendMessageResponse);
  }

  return {
    body: JSON.stringify({ message: "Success!" }),
  };
};
