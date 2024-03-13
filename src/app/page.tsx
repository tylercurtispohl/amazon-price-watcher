import { Button, Link } from "@nextui-org/react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../amplifyconfiguration.json";
import { listProducts } from "@/graphql/queries";
import { ProductsTable } from "./components/products/productsTable";
Amplify.configure(config);

const client = generateClient();

export default async function Home() {
  const listProductsResult = await client.graphql({
    query: listProducts,
  });

  // const products = listProductsResult.data.listProducts.items;

  // console.log(products);

  return (
    <div className="">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl tracking-wide font-semibold">Products</h1>

        <Button
          color="primary"
          href="/create-product"
          as={Link}
          variant="solid"
        >
          Create a product
        </Button>
      </div>
      <ProductsTable productsQueryResult={listProductsResult.data} />
    </div>
  );
}
