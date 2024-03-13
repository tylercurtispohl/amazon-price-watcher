"use client";

import {
  ListProductSubscriptionsQuery,
  ProductSubscriptionsByProductIdQuery,
} from "@/API";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const tableColumns = [
  {
    key: "email",
    label: "Email",
  },
  {
    key: "createdAt",
    label: "Created At",
  },
];

export const SubscriptionsTable = ({
  productSubscriptionsByProductIdQueryResult,
}: {
  productSubscriptionsByProductIdQueryResult: ProductSubscriptionsByProductIdQuery;
}) => {
  const subscriptions =
    productSubscriptionsByProductIdQueryResult.productSubscriptionsByProductId
      ?.items;
  const router = useRouter();

  return (
    <div>
      {subscriptions?.length && (
        <Table
          aria-label="Table of products that are scraped for their price"
          selectionBehavior="replace"
          selectionMode="multiple"
          onRowAction={(key) => {
            console.log("row clicked");
            router.push(`/subscription/${key}`);
          }}
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={subscriptions}>
            {(item) => (
              <TableRow key={item?.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
