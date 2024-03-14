/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
  onCreateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
  onUpdateProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
  onDeleteProduct(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onCreatePricePoint = /* GraphQL */ `subscription OnCreatePricePoint(
  $filter: ModelSubscriptionPricePointFilterInput
) {
  onCreatePricePoint(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePricePointSubscriptionVariables,
  APITypes.OnCreatePricePointSubscription
>;
export const onUpdatePricePoint = /* GraphQL */ `subscription OnUpdatePricePoint(
  $filter: ModelSubscriptionPricePointFilterInput
) {
  onUpdatePricePoint(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePricePointSubscriptionVariables,
  APITypes.OnUpdatePricePointSubscription
>;
export const onDeletePricePoint = /* GraphQL */ `subscription OnDeletePricePoint(
  $filter: ModelSubscriptionPricePointFilterInput
) {
  onDeletePricePoint(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePricePointSubscriptionVariables,
  APITypes.OnDeletePricePointSubscription
>;
export const onCreateProductSubscription = /* GraphQL */ `subscription OnCreateProductSubscription(
  $filter: ModelSubscriptionProductSubscriptionFilterInput
) {
  onCreateProductSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionSubscriptionVariables,
  APITypes.OnCreateProductSubscriptionSubscription
>;
export const onUpdateProductSubscription = /* GraphQL */ `subscription OnUpdateProductSubscription(
  $filter: ModelSubscriptionProductSubscriptionFilterInput
) {
  onUpdateProductSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionSubscriptionVariables,
  APITypes.OnUpdateProductSubscriptionSubscription
>;
export const onDeleteProductSubscription = /* GraphQL */ `subscription OnDeleteProductSubscription(
  $filter: ModelSubscriptionProductSubscriptionFilterInput
) {
  onDeleteProductSubscription(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionSubscriptionVariables,
  APITypes.OnDeleteProductSubscriptionSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onCreateNotification(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onUpdateNotification(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onDeleteNotification(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
