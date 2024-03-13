"use server";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../amplifyconfiguration.json";
import {
  createProduct,
  createProductSubscription,
  updateProduct,
  deleteProduct as deleteProductMutation,
} from "@/graphql/mutations";
import { ProductStatus } from "@/API";
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

  const response = await client.graphql({
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

  return {
    message: "Form submitted",
  };
}

export async function deleteProduct(prevSate: any, formData: FormData) {
  const productId = formData.get("productId")?.toString();

  if (!productId) {
    return { message: "Product ID is required" };
  }

  await client.graphql({
    query: deleteProductMutation,
    variables: {
      input: {
        id: productId,
      },
    },
  });

  const homePath = `/`;
  revalidatePath(homePath);
  redirect(homePath);
}
