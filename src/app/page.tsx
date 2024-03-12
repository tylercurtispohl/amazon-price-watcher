import { Link } from "@nextui-org/react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../amplifyconfiguration.json";
import { listProducts } from "@/graphql/queries";
import { ProductStatus } from "@/API";
Amplify.configure(config);

const client = generateClient();

export default async function Home() {
  const listProductsResult = await client.graphql({
    query: listProducts,
  });

  const products = listProductsResult.data.listProducts.items;

  console.log(products);

  return (
    <main className="">
      <h1>Dashboard</h1>
      <div>
        <ul>
          {products &&
            products.map((p) => (
              <li key={`li_p.id`}>
                <Link href={`/product/${p.id}`}>{p.name}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <Link href="/create-product" color="primary">
          Create a product
        </Link>
      </div>
    </main>
  );
}
