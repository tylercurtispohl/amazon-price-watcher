"use client";
import { useFormState } from "react-dom";
import { addProductInfo } from "../actions";
import { Button, Input } from "@nextui-org/react";

export default function Page() {
  const [state, formAction] = useFormState(addProductInfo, { message: "" });

  return (
    <div className="">
      <h1>Create product page</h1>
      <form action={formAction}>
        <Input type="text" label="Name" name="name" />
        <Input type="text" label="URL" name="url" />
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
