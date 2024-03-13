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
 * @returns
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
 * @returns
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
 * @returns
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
        productId
        notifications {
          id
          timestamp
          type
        }
      }
      nextToken
      __typename
    }
  }
`;

/**
 * Get all product subscriptions plus their notifications
 * @param {string} productId
 * @returns
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

  console.log(subscriptions);
  return subscriptions;
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
 * @returns
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
  getProduct,
  getProductSubscriptions,
  getLatestPricePoint,
  updateProductStatus,
};
