import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../../amplifyconfiguration.json";
import { getProduct, productSubscriptionsByProductId } from "@/graphql/queries";
import { Button, Link } from "@nextui-org/react";
import { SubscriptionsTable } from "@/app/components/subscriptions/subscriptionsTable";

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

  return (
    <div>
      {product ? (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-wide mb-6">
              {product.name}
            </h1>
            <h2 className="font-medium tracking-wide">URL:</h2>
            <p>{product.url}</p>
          </div>
          <div>
            <div className="flex flex-row justify-between mb-2">
              <h2 className="font-medium tracking-wide">Subscriptions</h2>
              <Button
                color="primary"
                href={`/create-subscription/${id}`}
                as={Link}
                variant="solid"
              >
                Create a subscription
              </Button>
            </div>
            <SubscriptionsTable
              productSubscriptionsByProductIdQueryResult={
                getSubscriptionsResult.data
              }
            />
          </div>
        </>
      ) : (
        <h1>Product not found!</h1>
      )}
    </div>
  );
}
