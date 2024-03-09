"use server";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import config from "../amplifyconfiguration.json";
import { createProduct } from "@/graphql/mutations";
import { ProductStatus } from "@/API";
Amplify.configure(config);

const client = generateClient();

export async function addProductInfo(prevState: any, formData: FormData) {
  console.log(formData.get("name"));
  console.log(formData.get("url"));

  const name = formData.get("name")?.toString();
  const url = formData.get("url")?.toString();

  // TODO: handle form validation
  if (!name) {
    return { message: "Name is required" };
  }

  if (!url) {
    return { message: "URL is required" };
  }

  const result = await client.graphql({
    query: createProduct,
    variables: {
      input: {
        name: name,
        url: url,
        status: ProductStatus.CONFIGURED,
      },
    },
  });

  console.log(result.data.createProduct);

  return {
    message: "Form submitted",
  };
}
