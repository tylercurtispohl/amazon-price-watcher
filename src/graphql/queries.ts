/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProduct = /* GraphQL */ `query GetProduct($id: ID!) {
  getProduct(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $id: ID
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProducts(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const getPricePoint = /* GraphQL */ `query GetPricePoint($id: ID!) {
  getPricePoint(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetPricePointQueryVariables,
  APITypes.GetPricePointQuery
>;
export const listPricePoints = /* GraphQL */ `query ListPricePoints(
  $id: ID
  $filter: ModelPricePointFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPricePoints(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      price
      timestamp
      productId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPricePointsQueryVariables,
  APITypes.ListPricePointsQuery
>;
export const getProductSubscription = /* GraphQL */ `query GetProductSubscription($id: ID!) {
  getProductSubscription(id: $id) {
    id
    email
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
` as GeneratedQuery<
  APITypes.GetProductSubscriptionQueryVariables,
  APITypes.GetProductSubscriptionQuery
>;
export const listProductSubscriptions = /* GraphQL */ `query ListProductSubscriptions(
  $id: ID
  $filter: ModelProductSubscriptionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProductSubscriptions(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      email
      productId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductSubscriptionsQueryVariables,
  APITypes.ListProductSubscriptionsQuery
>;
export const getNotification = /* GraphQL */ `query GetNotification($id: ID!) {
  getNotification(id: $id) {
    id
    timestamp
    type
    productSubscriptionId
    productSubscription {
      id
      email
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
` as GeneratedQuery<
  APITypes.GetNotificationQueryVariables,
  APITypes.GetNotificationQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $id: ID
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listNotifications(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      timestamp
      type
      productSubscriptionId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const pricePointsByProductIdAndTimestamp = /* GraphQL */ `query PricePointsByProductIdAndTimestamp(
  $productId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPricePointFilterInput
  $limit: Int
  $nextToken: String
) {
  pricePointsByProductIdAndTimestamp(
    productId: $productId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      price
      timestamp
      productId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PricePointsByProductIdAndTimestampQueryVariables,
  APITypes.PricePointsByProductIdAndTimestampQuery
>;
export const productSubscriptionsByProductId = /* GraphQL */ `query ProductSubscriptionsByProductId(
  $productId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelProductSubscriptionFilterInput
  $limit: Int
  $nextToken: String
) {
  productSubscriptionsByProductId(
    productId: $productId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      productId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ProductSubscriptionsByProductIdQueryVariables,
  APITypes.ProductSubscriptionsByProductIdQuery
>;
export const notificationsByProductSubscriptionIdAndTimestamp = /* GraphQL */ `query NotificationsByProductSubscriptionIdAndTimestamp(
  $productSubscriptionId: ID!
  $timestamp: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelNotificationFilterInput
  $limit: Int
  $nextToken: String
) {
  notificationsByProductSubscriptionIdAndTimestamp(
    productSubscriptionId: $productSubscriptionId
    timestamp: $timestamp
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      timestamp
      type
      productSubscriptionId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.NotificationsByProductSubscriptionIdAndTimestampQueryVariables,
  APITypes.NotificationsByProductSubscriptionIdAndTimestampQuery
>;
