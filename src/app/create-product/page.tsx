"use client";
import { useFormState } from "react-dom";
import { addProductInfo } from "../actions";
import { Button, Input } from "@nextui-org/react";

export default function Page() {
  const [state, formAction] = useFormState(addProductInfo, { message: "" });

  return (
    <div className="">
      <h1 className="text-2xl tracking-wide font-semibold mb-2">
        Create product
      </h1>
      <form action={formAction}>
        <Input className="mb-2" type="text" label="Name" name="name" required />
        <Input className="mb-2" type="text" label="URL" name="url" required />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
