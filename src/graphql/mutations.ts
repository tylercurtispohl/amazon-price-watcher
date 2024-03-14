/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
    id
    name
    url
    status
    message
    pricePoints {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
    id
    name
    url
    status
    message
    pricePoints {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
    id
    name
    url
    status
    message
    pricePoints {
      nextToken
      __typename
    }
    subscriptions {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createPricePoint = /* GraphQL */ `mutation CreatePricePoint(
  $input: CreatePricePointInput!
  $condition: ModelPricePointConditionInput
) {
  createPricePoint(input: $input, condition: $condition) {
    id
    price
    timestamp
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePricePointMutationVariables,
  APITypes.CreatePricePointMutation
>;
export const updatePricePoint = /* GraphQL */ `mutation UpdatePricePoint(
  $input: UpdatePricePointInput!
  $condition: ModelPricePointConditionInput
) {
  updatePricePoint(input: $input, condition: $condition) {
    id
    price
    timestamp
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePricePointMutationVariables,
  APITypes.UpdatePricePointMutation
>;
export const deletePricePoint = /* GraphQL */ `mutation DeletePricePoint(
  $input: DeletePricePointInput!
  $condition: ModelPricePointConditionInput
) {
  deletePricePoint(input: $input, condition: $condition) {
    id
    price
    timestamp
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePricePointMutationVariables,
  APITypes.DeletePricePointMutation
>;
export const createProductSubscription = /* GraphQL */ `mutation CreateProductSubscription(
  $input: CreateProductSubscriptionInput!
  $condition: ModelProductSubscriptionConditionInput
) {
  createProductSubscription(input: $input, condition: $condition) {
    id
    email
    status
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProductSubscriptionMutationVariables,
  APITypes.CreateProductSubscriptionMutation
>;
export const updateProductSubscription = /* GraphQL */ `mutation UpdateProductSubscription(
  $input: UpdateProductSubscriptionInput!
  $condition: ModelProductSubscriptionConditionInput
) {
  updateProductSubscription(input: $input, condition: $condition) {
    id
    email
    status
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProductSubscriptionMutationVariables,
  APITypes.UpdateProductSubscriptionMutation
>;
export const deleteProductSubscription = /* GraphQL */ `mutation DeleteProductSubscription(
  $input: DeleteProductSubscriptionInput!
  $condition: ModelProductSubscriptionConditionInput
) {
  deleteProductSubscription(input: $input, condition: $condition) {
    id
    email
    status
    productId
    product {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    notifications {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProductSubscriptionMutationVariables,
  APITypes.DeleteProductSubscriptionMutation
>;
export const createNotification = /* GraphQL */ `mutation CreateNotification(
  $input: CreateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  createNotification(input: $input, condition: $condition) {
    id
    timestamp
    type
    productSubscriptionId
    productSubscription {
      id
      email
      status
      productId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateNotificationMutationVariables,
  APITypes.CreateNotificationMutation
>;
export const updateNotification = /* GraphQL */ `mutation UpdateNotification(
  $input: UpdateNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  updateNotification(input: $input, condition: $condition) {
    id
    timestamp
    type
    productSubscriptionId
    productSubscription {
      id
      email
      status
      productId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateNotificationMutationVariables,
  APITypes.UpdateNotificationMutation
>;
export const deleteNotification = /* GraphQL */ `mutation DeleteNotification(
  $input: DeleteNotificationInput!
  $condition: ModelNotificationConditionInput
) {
  deleteNotification(input: $input, condition: $condition) {
    id
    timestamp
    type
    productSubscriptionId
    productSubscription {
      id
      email
      status
      productId
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteNotificationMutationVariables,
  APITypes.DeleteNotificationMutation
>;
