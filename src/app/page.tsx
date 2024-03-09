import { Link } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="">
      Home page
      <div>
        <Link href="/create-product" color="primary">
          Create a product
        </Link>
      </div>
    </main>
  );
}
