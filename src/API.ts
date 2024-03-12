/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  id?: string | null,
  name: string,
  url: string,
  status: ProductStatus,
  message?: string | null,
};

export enum ProductStatus {
  CONFIGURED = "CONFIGURED",
  ERROR = "ERROR",
}


export type ModelProductConditionInput = {
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  status?: ModelProductStatusInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelProductStatusInput = {
  eq?: ProductStatus | null,
  ne?: ProductStatus | null,
};

export type Product = {
  __typename: "Product",
  id: string,
  name: string,
  url: string,
  status: ProductStatus,
  message?: string | null,
  pricePoints?: ModelPricePointConnection | null,
  subscriptions?: ModelProductSubscriptionConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPricePointConnection = {
  __typename: "ModelPricePointConnection",
  items:  Array<PricePoint | null >,
  nextToken?: string | null,
};

export type PricePoint = {
  __typename: "PricePoint",
  id: string,
  price: number,
  timestamp: string,
  productId: string,
  product: Product,
  createdAt: string,
  updatedAt: string,
};

export type ModelProductSubscriptionConnection = {
  __typename: "ModelProductSubscriptionConnection",
  items:  Array<ProductSubscription | null >,
  nextToken?: string | null,
};

export type ProductSubscription = {
  __typename: "ProductSubscription",
  id: string,
  email: string,
  productId: string,
  product: Product,
  Notifications?: ModelNotificationConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  timestamp: string,
  type: NotificationType,
  productSubscriptionId: string,
  productSubscription: ProductSubscription,
  createdAt: string,
  updatedAt: string,
};

export enum NotificationType {
  EMAIL = "EMAIL",
}


export type UpdateProductInput = {
  id: string,
  name?: string | null,
  url?: string | null,
  status?: ProductStatus | null,
  message?: string | null,
};

export type DeleteProductInput = {
  id: string,
};

export type CreatePricePointInput = {
  id?: string | null,
  price: number,
  timestamp: string,
  productId: string,
};

export type ModelPricePointConditionInput = {
  price?: ModelFloatInput | null,
  timestamp?: ModelStringInput | null,
  productId?: ModelIDInput | null,
  and?: Array< ModelPricePointConditionInput | null > | null,
  or?: Array< ModelPricePointConditionInput | null > | null,
  not?: ModelPricePointConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePricePointInput = {
  id: string,
  price?: number | null,
  timestamp?: string | null,
  productId?: string | null,
};

export type DeletePricePointInput = {
  id: string,
};

export type CreateProductSubscriptionInput = {
  id?: string | null,
  email: string,
  productId: string,
};

export type ModelProductSubscriptionConditionInput = {
  email?: ModelStringInput | null,
  productId?: ModelIDInput | null,
  and?: Array< ModelProductSubscriptionConditionInput | null > | null,
  or?: Array< ModelProductSubscriptionConditionInput | null > | null,
  not?: ModelProductSubscriptionConditionInput | null,
};

export type UpdateProductSubscriptionInput = {
  id: string,
  email?: string | null,
  productId?: string | null,
};

export type DeleteProductSubscriptionInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  timestamp: string,
  type: NotificationType,
  productSubscriptionId: string,
};

export type ModelNotificationConditionInput = {
  timestamp?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  productSubscriptionId?: ModelIDInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type ModelNotificationTypeInput = {
  eq?: NotificationType | null,
  ne?: NotificationType | null,
};

export type UpdateNotificationInput = {
  id: string,
  timestamp?: string | null,
  type?: NotificationType | null,
  productSubscriptionId?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type ModelProductFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  url?: ModelStringInput | null,
  status?: ModelProductStatusInput | null,
  message?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
};

export type ModelPricePointFilterInput = {
  id?: ModelIDInput | null,
  price?: ModelFloatInput | null,
  timestamp?: ModelStringInput | null,
  productId?: ModelIDInput | null,
  and?: Array< ModelPricePointFilterInput | null > | null,
  or?: Array< ModelPricePointFilterInput | null > | null,
  not?: ModelPricePointFilterInput | null,
};

export type ModelProductSubscriptionFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  productId?: ModelIDInput | null,
  and?: Array< ModelProductSubscriptionFilterInput | null > | null,
  or?: Array< ModelProductSubscriptionFilterInput | null > | null,
  not?: ModelProductSubscriptionFilterInput | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  timestamp?: ModelStringInput | null,
  type?: ModelNotificationTypeInput | null,
  productSubscriptionId?: ModelIDInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelSubscriptionProductFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  url?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  message?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionPricePointFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  price?: ModelSubscriptionFloatInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  productId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionPricePointFilterInput | null > | null,
  or?: Array< ModelSubscriptionPricePointFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionProductSubscriptionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  productId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionProductSubscriptionFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductSubscriptionFilterInput | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  timestamp?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  productSubscriptionId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePricePointMutationVariables = {
  input: CreatePricePointInput,
  condition?: ModelPricePointConditionInput | null,
};

export type CreatePricePointMutation = {
  createPricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePricePointMutationVariables = {
  input: UpdatePricePointInput,
  condition?: ModelPricePointConditionInput | null,
};

export type UpdatePricePointMutation = {
  updatePricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePricePointMutationVariables = {
  input: DeletePricePointInput,
  condition?: ModelPricePointConditionInput | null,
};

export type DeletePricePointMutation = {
  deletePricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProductSubscriptionMutationVariables = {
  input: CreateProductSubscriptionInput,
  condition?: ModelProductSubscriptionConditionInput | null,
};

export type CreateProductSubscriptionMutation = {
  createProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProductSubscriptionMutationVariables = {
  input: UpdateProductSubscriptionInput,
  condition?: ModelProductSubscriptionConditionInput | null,
};

export type UpdateProductSubscriptionMutation = {
  updateProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProductSubscriptionMutationVariables = {
  input: DeleteProductSubscriptionInput,
  condition?: ModelProductSubscriptionConditionInput | null,
};

export type DeleteProductSubscriptionMutation = {
  deleteProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetProductQueryVariables = {
  id: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductsQueryVariables = {
  id?: string | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPricePointQueryVariables = {
  id: string,
};

export type GetPricePointQuery = {
  getPricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPricePointsQueryVariables = {
  id?: string | null,
  filter?: ModelPricePointFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPricePointsQuery = {
  listPricePoints?:  {
    __typename: "ModelPricePointConnection",
    items:  Array< {
      __typename: "PricePoint",
      id: string,
      price: number,
      timestamp: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProductSubscriptionQueryVariables = {
  id: string,
};

export type GetProductSubscriptionQuery = {
  getProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProductSubscriptionsQueryVariables = {
  id?: string | null,
  filter?: ModelProductSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductSubscriptionsQuery = {
  listProductSubscriptions?:  {
    __typename: "ModelProductSubscriptionConnection",
    items:  Array< {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  id?: string | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      timestamp: string,
      type: NotificationType,
      productSubscriptionId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PricePointsByProductIdAndTimestampQueryVariables = {
  productId: string,
  timestamp?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPricePointFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PricePointsByProductIdAndTimestampQuery = {
  pricePointsByProductIdAndTimestamp?:  {
    __typename: "ModelPricePointConnection",
    items:  Array< {
      __typename: "PricePoint",
      id: string,
      price: number,
      timestamp: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProductSubscriptionsByProductIdQueryVariables = {
  productId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProductSubscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProductSubscriptionsByProductIdQuery = {
  productSubscriptionsByProductId?:  {
    __typename: "ModelProductSubscriptionConnection",
    items:  Array< {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByProductSubscriptionIdAndTimestampQueryVariables = {
  productSubscriptionId: string,
  timestamp?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByProductSubscriptionIdAndTimestampQuery = {
  notificationsByProductSubscriptionIdAndTimestamp?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      timestamp: string,
      type: NotificationType,
      productSubscriptionId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    id: string,
    name: string,
    url: string,
    status: ProductStatus,
    message?: string | null,
    pricePoints?:  {
      __typename: "ModelPricePointConnection",
      nextToken?: string | null,
    } | null,
    subscriptions?:  {
      __typename: "ModelProductSubscriptionConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePricePointSubscriptionVariables = {
  filter?: ModelSubscriptionPricePointFilterInput | null,
};

export type OnCreatePricePointSubscription = {
  onCreatePricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePricePointSubscriptionVariables = {
  filter?: ModelSubscriptionPricePointFilterInput | null,
};

export type OnUpdatePricePointSubscription = {
  onUpdatePricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePricePointSubscriptionVariables = {
  filter?: ModelSubscriptionPricePointFilterInput | null,
};

export type OnDeletePricePointSubscription = {
  onDeletePricePoint?:  {
    __typename: "PricePoint",
    id: string,
    price: number,
    timestamp: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProductSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionProductSubscriptionFilterInput | null,
};

export type OnCreateProductSubscriptionSubscription = {
  onCreateProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProductSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionProductSubscriptionFilterInput | null,
};

export type OnUpdateProductSubscriptionSubscription = {
  onUpdateProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProductSubscriptionSubscriptionVariables = {
  filter?: ModelSubscriptionProductSubscriptionFilterInput | null,
};

export type OnDeleteProductSubscriptionSubscription = {
  onDeleteProductSubscription?:  {
    __typename: "ProductSubscription",
    id: string,
    email: string,
    productId: string,
    product:  {
      __typename: "Product",
      id: string,
      name: string,
      url: string,
      status: ProductStatus,
      message?: string | null,
      createdAt: string,
      updatedAt: string,
    },
    Notifications?:  {
      __typename: "ModelNotificationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    timestamp: string,
    type: NotificationType,
    productSubscriptionId: string,
    productSubscription:  {
      __typename: "ProductSubscription",
      id: string,
      email: string,
      productId: string,
      createdAt: string,
      updatedAt: string,
    },
    createdAt: string,
    updatedAt: string,
  } | null,
};
