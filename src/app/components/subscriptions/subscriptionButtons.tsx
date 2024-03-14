"use client";
import { useFormState } from "react-dom";
import { ProductSubscriptionStatus } from "@/API";
import { Button } from "@nextui-org/react";
import { disableSubscription, enableSubscription } from "@/app/actions";

export const SubscriptionButtons = ({
  productId,
  subscriptionId,
  status,
}: {
  productId: string;
  subscriptionId: string;
  status: ProductSubscriptionStatus;
}) => {
  const [disableState, disableAction] = useFormState(disableSubscription, {
    message: "",
  });
  const [enableState, enableAction] = useFormState(enableSubscription, {
    message: "",
  });

  const hiddenInputs = (
    <>
      <input type="hidden" value={productId} name="productId" />
      <input type="hidden" value={subscriptionId} name="subscriptionId" />
    </>
  );

  return (
    <div className="flex flex-row gap-2">
      {status === ProductSubscriptionStatus.CONFIGURED && (
        <form action={disableAction}>
          {hiddenInputs}
          <Button color="danger" type="submit">
            Disable
          </Button>
        </form>
      )}
      {status === ProductSubscriptionStatus.DISABLED && (
        <form action={enableAction}>
          {hiddenInputs}
          <Button color="primary" type="submit">
            Enable
          </Button>
        </form>
      )}
    </div>
  );
};
