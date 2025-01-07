"use-client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export type Merch = {
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  available: boolean;
  stock: number;
};

export type Order = {
  username: string;
  email: string;
  quantity: number;
  delivered: boolean;
  totalAmount: number | undefined;
  paymentStatus: "SUCCESS" | "FAILED" | "PENDING" | "REFUNDED" | undefined;
  merchName: string;
  paymentId: string | undefined;
};

export const merchColumns: ColumnDef<Merch>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "originalPrice",
    header: "Original Price",
  },
  {
    accessorKey: "discountPrice",
    header: "Discount Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "totalSales",
    header: "Sales",
  },
];

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "delivered",
    header: "Delivered",
    cell: ({ row }) => {
      const delivered = row.getValue("delivered");
      return (
        <div className="font-medium">{delivered ? "Done" : "Pending"}</div>
      );
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Status",
  },
  {
    accessorKey: "merchName",
    header: "Merch Name",
  },
  // {
  //   accessorKey: "paymentId",
  //   header: "Refund",
  //   cell: ({ row }) => {
  //     const [isRefunding, setIsRefunding] = useState(false);
  //     const initiateRefund = api.payment.initiateRefund.useMutation({
  //       onMutate: () => {
  //         setIsRefunding(true);
  //       },
  //       onSuccess: () => {
  //         // Update local state or refetch data
  //         row.updateData("paymentStatus", "REFUNDED");
  //       },
  //       onSettled: () => {
  //         setIsRefunding(false);
  //       },
  //     });

  //     const status = row.getValue("paymentStatus");
  //     const paymentId = row.getValue("paymentId");

  //     return (
  //       <Button
  //         variant={"destructive"}
  //         disabled={status !== "SUCCESS" || isRefunding}
  //         onClick={() => {
  //           if (paymentId) {
  //             initiateRefund.mutate({ paymentId });
  //           }
  //         }}
  //         size={"sm"}
  //       >
  //         {isRefunding ? "Processing..." : "Refund"}
  //       </Button>
  //     );
  //   },
  // },
];
