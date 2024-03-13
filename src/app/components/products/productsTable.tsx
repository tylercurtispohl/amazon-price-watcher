"use client";

import { ListProductsQuery } from "@/API";
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
    key: "name",
    label: "Name",
  },
  {
    key: "url",
    label: "URL",
  },
  {
    key: "status",
    label: "Status",
  },
];

export const ProductsTable = ({
  productsQueryResult,
}: {
  productsQueryResult: ListProductsQuery;
}) => {
  const products = productsQueryResult?.listProducts?.items;
  const router = useRouter();

  return (
    <div>
      {products && (
        <Table
          aria-label="Table of products that are scraped for their price"
          selectionBehavior="replace"
          selectionMode="multiple"
          onRowAction={(key) => {
            console.log("row clicked");
            router.push(`/product/${key}`);
          }}
          classNames={{
            td: "text-nowrap max-w-36 text-ellipsis overflow-hidden",
          }}
        >
          <TableHeader columns={tableColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={products}>
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
