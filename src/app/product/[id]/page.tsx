import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../../amplifyconfiguration.json";
import {
  getProduct,
  pricePointsByProductIdAndTimestamp,
  productSubscriptionsByProductId,
} from "@/graphql/queries";
import { Button, Link } from "@nextui-org/react";
import { SubscriptionsTable } from "@/app/components/subscriptions/subscriptionsTable";
import { ProductButtons } from "@/app/components/products/productButtons";
import { ProductPriceChart } from "@/app/components/products/productPriceChart";
import { CopyToClipboardButton } from "@/app/components/copyToClipboardButton";
import { NavigateToUrlButton } from "@/app/components/navigateToUrlButton";

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

  const pricePointsResult = await client.graphql({
    query: pricePointsByProductIdAndTimestamp,
    variables: {
      productId: id,
    },
  });

  return (
    <div>
      {product ? (
        <>
          <div className="mb-6">
            <div className="flex flex-row justify-between">
              <h1 className="text-2xl font-semibold tracking-wide mb-6">
                {product.name}
              </h1>
              <ProductButtons productId={product.id} status={product.status} />
            </div>
            <div className="mb-6">
              <ProductPriceChart
                pricePointsQueryResult={pricePointsResult.data}
              />
            </div>
            <div className="mb-2">
              <h2 className="font-medium tracking-wide">Status</h2>
              <p>{product.status}</p>
            </div>
            <div>
              <div className="flex flex-row gap-2">
                <h2 className="font-medium tracking-wide">URL</h2>
                <CopyToClipboardButton text={product.url} />
                <NavigateToUrlButton url={product.url} />
              </div>
              <p className="w-full truncate">{product.url}</p>
            </div>
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
