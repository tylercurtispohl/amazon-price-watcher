import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../../amplifyconfiguration.json";
import { getProduct, productSubscriptionsByProductId } from "@/graphql/queries";
import { Link } from "@nextui-org/react";
Amplify.configure(config);

const client = generateClient();

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const getProductResult = await client.graphql({
    query: getProduct,
    variables: {
      id,
    },
  });

  const product = getProductResult.data.getProduct;

  const getSubscriptionsResult = await client.graphql({
    query: productSubscriptionsByProductId,
    variables: {
      productId: id,
    },
  });

  const subscriptions =
    getSubscriptionsResult.data.productSubscriptionsByProductId.items;

  return (
    <div>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>{product.url}</p>
          <div>
            <h2>Subscriptions</h2>
            {subscriptions && (
              <ul>
                {subscriptions.map((s) => (
                  <li key={`subscription_${s.id}`}>{s.email}</li>
                ))}
              </ul>
            )}
          </div>
          <Link href={`/create-subscription/${product.id}`}>
            Create a subscription
          </Link>
        </>
      ) : (
        <h1>Product not found!</h1>
      )}
    </div>
  );
}
