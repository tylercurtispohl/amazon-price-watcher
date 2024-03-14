"use client";

import { addProductSubscription } from "@/app/actions";
import { Button, Input } from "@nextui-org/react";
import { useFormState } from "react-dom";

export const CreateSubscriptionForm = ({
  productId,
}: {
  productId: string;
}) => {
  const [state, formAction] = useFormState(addProductSubscription, {
    message: "",
  });

  return (
    <form action={formAction}>
      <input type="hidden" value={productId} name="productId" />
      <Input
        className="mb-2"
        type="email"
        label="Email"
        name="email"
        required
      />
      <Button color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
