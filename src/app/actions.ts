"use server";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../amplifyconfiguration.json";
import {
  createProduct,
  createProductSubscription,
  updateProduct,
  deleteProduct as deleteProductMutation,
  updateProductSubscription,
} from "@/graphql/mutations";
import { ProductStatus, ProductSubscriptionStatus } from "@/API";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

Amplify.configure(config);

const client = generateClient();

export async function addProductInfo(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString();
  const url = formData.get("url")?.toString();

  // TODO: handle form validation
  if (!name) {
    return { message: "Name is required" };
  }

  if (!url) {
    return { message: "URL is required" };
  }

  await client.graphql({
    query: createProduct,
    variables: {
      input: {
        name: name,
        url: url,
        status: ProductStatus.CONFIGURED,
      },
    },
  });

  const homePath = `/`;
  revalidatePath(homePath);
  redirect(homePath);

  return {
    message: "Form submitted",
  };
}

export async function addProductSubscription(
  prevState: any,
  formData: FormData
) {
  const productId = formData.get("productId")?.toString();
  const email = formData.get("email")?.toString();

  if (!productId) {
    return { message: "Product ID is required" };
  }

  if (!email) {
    return { message: "Email is required" };
  }

  await client.graphql({
    query: createProductSubscription,
    variables: {
      input: {
        productId,
        email,
        status: ProductSubscriptionStatus.CONFIGURED,
      },
    },
  });

  const productPagePath = `/product/${productId}`;
  revalidatePath(productPagePath);
  redirect(productPagePath);

  return {
    message: "Form submitted",
  };
}

export async function disableProduct(prevState: any, formData: FormData) {
  const productId = formData.get("productId")?.toString();

  if (!productId) {
    return { message: "Product ID is required" };
  }

  await client.graphql({
    query: updateProduct,
    variables: {
      input: {
        id: productId,
        status: ProductStatus.DISABLED,
      },
    },
  });

  const productPagePath = `/product/${productId}`;
  revalidatePath(productPagePath);
  revalidatePath("/");

  return {
    message: "Form submitted",
  };
}

export async function enableProduct(prevState: any, formData: FormData) {
  const productId = formData.get("productId")?.toString();

  if (!productId) {
    return { message: "Product ID is required" };
  }

  await client.graphql({
    query: updateProduct,
    variables: {
      input: {
        id: productId,
        status: ProductStatus.CONFIGURED,
      },
    },
  });

  const productPagePath = `/product/${productId}`;
  revalidatePath(productPagePath);
  revalidatePath("/");

  return {
    message: "Form submitted",
  };
}

// Leaving this delete function commented out for now.
// If a product is deleted, we also need to delete everything related to it
// and I didn't want to go that far at the moment.
// Or we can implement an archive/soft delete functionality.
// export async function deleteProduct(prevSate: any, formData: FormData) {
//   const productId = formData.get("productId")?.toString();

//   if (!productId) {
//     return { message: "Product ID is required" };
//   }

//   await client.graphql({
//     query: deleteProductMutation,
//     variables: {
//       input: {
//         id: productId,
//       },
//     },
//   });

//   const homePath = `/`;
//   revalidatePath(homePath);
//   redirect(homePath);
// }

export async function disableSubscription(prevState: any, formData: FormData) {
  const subscriptionId = formData.get("subscriptionId")?.toString();
  const productId = formData.get("productId")?.toString();

  if (!subscriptionId) {
    return { message: "Subscription ID is required" };
  }

  if (!productId) {
    return { message: "Product ID is required" };
  }

  await client.graphql({
    query: updateProductSubscription,
    variables: {
      input: {
        id: subscriptionId,
        status: ProductSubscriptionStatus.DISABLED,
      },
    },
  });

  const subscriptionPagePath = `/subscription/${subscriptionId}`;
  revalidatePath(subscriptionPagePath);

  const productPagePath = `/product/${productId}`;
  revalidatePath(productPagePath);

  return {
    message: "Form submitted",
  };
}

export async function enableSubscription(prevState: any, formData: FormData) {
  const subscriptionId = formData.get("subscriptionId")?.toString();
  const productId = formData.get("productId")?.toString();

  if (!subscriptionId) {
    return { message: "Product ID is required" };
  }

  if (!productId) {
    return { message: "Product ID is required" };
  }

  await client.graphql({
    query: updateProductSubscription,
    variables: {
      input: {
        id: subscriptionId,
        status: ProductSubscriptionStatus.CONFIGURED,
      },
    },
  });

  const subscriptionPagePath = `/subscription/${subscriptionId}`;
  revalidatePath(subscriptionPagePath);

  const productPagePath = `/product/${productId}`;
  revalidatePath(productPagePath);

  return {
    message: "Form submitted",
  };
}
