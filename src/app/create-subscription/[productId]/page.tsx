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
          <h1>Create a product subscription for {product?.name}</h1>
          <CreateSubscriptionForm productId={product.id} />
        </>
      ) : (
        <h1>Product not found!</h1>
      )}
    </div>
  );
}
// "use client";
// import { Amplify } from "aws-amplify";
// import { generateClient } from "aws-amplify/api";
// import config from "../../../amplifyconfiguration.json";
// import { getProduct } from "@/graphql/queries";
// import { CreateSubscriptionForm } from "@/app/components/create-subscription/createSubscriptionForm";
// import { useFormState } from "react-dom";
// import { addProductSubscription } from "@/app/actions";
// import { Input } from "@nextui-org/react";
// Amplify.configure(config);

// const client = generateClient();

// export default function Page({ params }: { params: { productId: string } }) {
//   //   const { productId } = params;

//   //   const getProductResult = await client.graphql({
//   //     query: getProduct,
//   //     variables: {
//   //       id: productId,
//   //     },
//   //   });

//   //   const product = getProductResult.data.getProduct;
//   const product = {
//     name: "Fake",
//     id: "123",
//   };
//   const [state, formAction] = useFormState(addProductSubscription, {
//     message: "",
//   });

//   return (
//     <main>
//       {product ? (
//         <>
//           <h1>Create a product subscription for {product?.name}</h1>
//           <form action={formAction}>
//             {/* <input type="hidden" value={product.id} name="productId" /> */}
//             <input type="email" />
//             {/* <Input type="text" label="Email" name="email" /> */}
//             {/* <Button color="primary" type="submit">
//         Submit
//       </Button> */}
//           </form>
//         </>
//       ) : (
//         <h1>Product not found!</h1>
//       )}
//     </main>
//   );
// }
