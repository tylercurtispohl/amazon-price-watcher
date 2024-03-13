export type AmplifyDependentResourcesAttributes = {
  "api": {
    "amzpricewatcher": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "function": {
    "amzpricewatcherpriceWatcherLayer": {
      "Arn": "string"
    },
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
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "queue": {
    "priceWatcherQueue": {
      "PriceMessengerQueueARN": "string",
      "PriceMessengerQueueName": "string",
      "PriceMessengerQueueURL": "string",
      "QueueARN": "string",
      "QueueName": "string",
      "QueueURL": "string"
    }
  }
}