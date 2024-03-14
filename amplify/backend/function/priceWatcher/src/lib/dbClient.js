const GRAPHQL_ENDPOINT =
  process.env.API_AMZPRICEWATCHER_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_AMZPRICEWATCHER_GRAPHQLAPIKEYOUTPUT;

/**
 * Executes a GraphQL query to the AppSync API
 * @param {string} query a graphQL query as a string
 * @param {*} variables an object containing the input variables to the query
 * @returns the body of the response
 */
const sendGraphQlRequest = async (query, variables) => {
  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: "POST",
    headers: {
      "x-api-key": GRAPHQL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  const response = await fetch(request);

  const responseBody = await response.json();

  return responseBody;
};

// The queries in this file are copied from <root>/src/graphql/queries and /mutations
// and sometimes modified. In the future, these should be in shared code between the
// frontend and backend.
const getProductQuery = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
      __typename
    }
  }
`;

/**
 * Gets a single product by ID
 * @param {string} productId
 * @returns a single Product record
 */
const getProduct = async (productId) => {
  const variables = {
    id: productId,
  };

  const response = await sendGraphQlRequest(getProductQuery, variables);

  const product = response.data?.getProduct;

  return product;
};

const updateProductMutation = /* GraphQL */ `
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      id
      name
      url
      status
      message
      createdAt
      updatedAt
    }
  }
`;

/**
 * Update a product's status and message
 * @param {string} productId
 * @param {"CONFIGURED" | "ERROR"} status
 * @param {string} message
 * @returns The updated Product record
 */
const updateProductStatus = async (productId, status, message) => {
  const variables = {
    input: {
      id: productId,
      status,
      message,
    },
  };

  const response = await sendGraphQlRequest(updateProductMutation, variables);

  const product = response.data?.updateProduct;

  return product;
};

const createPricePointMutation = /* GraphQL */ `
  mutation CreatePricePoint($input: CreatePricePointInput!) {
    createPricePoint(input: $input) {
      id
      price
      timestamp
      productId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Adds a price point to the database
 * @param {string} productId
 * @param {number} price
 * @returns The new PricePoint record
 */
const createPricePoint = async (productId, price) => {
  const timestamp = new Date().toISOString();

  const variables = {
    input: {
      productId,
      price,
      timestamp,
    },
  };

  const response = await sendGraphQlRequest(
    createPricePointMutation,
    variables
  );

  const pricePoint = response.data?.updateProduct;

  return pricePoint;
};

const pricePointsByProductIdAndTimestamp = /* GraphQL */ `
  query PricePointsByProductIdAndTimestamp(
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
      }
    }
  }
`;

/**
 * Gets the latest PricePoint record with the given productId
 * @param {string} productId
 * @returns A single PricePoint record
 */
const getLatestPricePoint = async (productId) => {
  const variables = {
    productId,
    sortDirection: "DESC",
    limit: 1,
  };

  const response = await sendGraphQlRequest(
    pricePointsByProductIdAndTimestamp,
    variables
  );

  const pricePoints = response.data?.pricePointsByProductIdAndTimestamp?.items;

  return pricePoints?.[0];
};

const productSubscriptionsByProductId = /* GraphQL */ `
  query ProductSubscriptionsByProductId(
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
        status
        productId
      }
      nextToken
      __typename
    }
  }
`;

/**
 * Get all product subscriptions plus their notifications
 * @param {string} productId
 * @returns An array of ProductSubscription records
 */
const getProductSubscriptions = async (productId) => {
  const variables = {
    productId,
  };

  const response = await sendGraphQlRequest(
    productSubscriptionsByProductId,
    variables
  );

  const subscriptions = response.data?.productSubscriptionsByProductId?.items;

  return subscriptions;
};

const notificationsByProductSubscriptionIdAndTimestamp = /* GraphQL */ `
  query NotificationsByProductSubscriptionIdAndTimestamp(
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
      }
      nextToken
      __typename
    }
  }
`;

/**
 * Gets the latest notification for a subscription
 * @param {string} productSubscriptionId
 * @returns A single Notification record
 */
const getLatestNotification = async (productSubscriptionId) => {
  const variables = {
    productSubscriptionId,
    sortDirection: "DESC",
    limit: 1,
  };

  const response = await sendGraphQlRequest(
    notificationsByProductSubscriptionIdAndTimestamp,
    variables
  );

  return response.data?.notificationsByProductSubscriptionIdAndTimestamp?.items;
};

const createNotificationMutation = /* GraphQL */ `
  mutation CreateNotification(
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
`;

/**
 * Create a notification in the database
 * @param {string} productSubscriptionId
 * @param {string} timestamp
 * @param {"EMAIL_INITIAL" | "EMAIL_NEWPRICE"} type
 * @returns The new Notification record
 */
const createNotification = async (productSubscriptionId, timestamp, type) => {
  const variables = {
    input: {
      productSubscriptionId,
      timestamp,
      type,
    },
  };

  const response = await sendGraphQlRequest(
    createNotificationMutation,
    variables
  );

  return response.data?.createNotification;
};

module.exports = {
  createNotification,
  createPricePoint,
  getLatestNotification,
  getProduct,
  getProductSubscriptions,
  getLatestPricePoint,
  updateProductStatus,
};
