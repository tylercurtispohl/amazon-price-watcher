export type AmplifyDependentResourcesAttributes = {
  "api": {
    "amzpricewatcher": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "orchestrator": {
      "Arn": "string",
      "CloudWatchEventRule": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "priceWatcher": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "queue": {
    "priceWatcherQueue": {
      "QueueARN": "string",
      "QueueName": "string",
      "QueueURL": "string"
    }
  }
}