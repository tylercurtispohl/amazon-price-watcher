import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../../../amplifyconfiguration.json";
import { getProduct } from "@/graphql/queries";
import { CreateSubscriptionForm } from "@/app/components/create-subscription/createSubscriptionForm";
Amplify.configure(config);

const client = generateClient();

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = params;

  const getProductResult = await client.graphql({
    query: getProduct,
    variables: {
      id: productId,
    },
  });

  const product = getProductResult.data.getProduct;

  return (
    <div>
      {product ? (
        <>
          <h1 className="text-2xl tracking-wide font-semibold mb-2">
            Create a product subscription for {product?.name}
          </h1>
          <CreateSubscriptionForm productId={product.id} />
        </>
      ) : (
        <h1>Product not found!</h1>
      )}
    </div>
  );
}
