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

const listProductsQuery = /* GraphQL */ `
  query ListProducts(
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
`;

/**
 * Gets a list of products where the status is "CONFIGURED"
 * @returns an array of products
 */
const getConfiguredProducts = async () => {
  const variables = {
    filter: {
      status: {
        eq: "CONFIGURED",
      },
    },
  };

  const response = await sendGraphQlRequest(listProductsQuery, variables);

  const products = response.data.listProducts?.items;

  return products;
};

module.exports = {
  getConfiguredProducts,
};
