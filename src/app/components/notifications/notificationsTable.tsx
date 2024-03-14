"use client";

import {
  ListProductSubscriptionsQuery,
  NotificationsByProductSubscriptionIdAndTimestampQuery,
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
    key: "timestamp",
    label: "Sent At",
  },
  {
    key: "type",
    label: "Notification Type",
  },
];

export const NotificationsTable = ({
  notificationsByProductSubscriptionIdAndTimestampQueryresult,
}: {
  notificationsByProductSubscriptionIdAndTimestampQueryresult: NotificationsByProductSubscriptionIdAndTimestampQuery;
}) => {
  const notifications =
    notificationsByProductSubscriptionIdAndTimestampQueryresult
      .notificationsByProductSubscriptionIdAndTimestamp?.items;
  const router = useRouter();

  return (
    <div>
      {!!notifications?.length && (
        <Table
          aria-label="Table of products that are scraped for their price"
          isStriped
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={notifications}>
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
