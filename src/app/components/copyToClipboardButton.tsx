"use client";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

export const CopyToClipboardButton = ({ text }: { text: string }) => {
  return (
    <Button
      size="sm"
      variant="light"
      onPress={() => {
        navigator.clipboard.writeText(text);
      }}
    >
      <DocumentDuplicateIcon className="h-6 w-6" />
    </Button>
  );
};
