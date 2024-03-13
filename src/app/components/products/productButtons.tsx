"use client";
import { useFormState } from "react-dom";
import { ProductStatus } from "@/API";
import { Button } from "@nextui-org/react";
import { deleteProduct, disableProduct, enableProduct } from "@/app/actions";

export const ProductButtons = ({
  productId,
  status,
}: {
  productId: string;
  status: ProductStatus;
}) => {
  const [disableState, disableAction] = useFormState(disableProduct, {
    message: "",
  });
  const [enableState, enableAction] = useFormState(enableProduct, {
    message: "",
  });
  const [deleteState, deleteAction] = useFormState(deleteProduct, {
    message: "",
  });
  return (
    <div className="flex flex-row gap-2">
      {status === ProductStatus.CONFIGURED && (
        <form action={disableAction}>
          <input type="hidden" value={productId} name="productId" />
          <Button color="danger" type="submit">
            Disable
          </Button>
        </form>
      )}
      {status !== ProductStatus.CONFIGURED && (
        <form action={enableAction}>
          <input type="hidden" value={productId} name="productId" />
          <Button
            color="primary"
            type="submit"
            disabled={status === ProductStatus.ERROR}
          >
            Enable
          </Button>
        </form>
      )}
      <form action={deleteAction}>
        <input type="hidden" value={productId} name="productId" />
        <Button color="danger" type="submit">
          Delete
        </Button>
      </form>
    </div>
  );
};
