"use client";

import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Button, Link } from "@nextui-org/react";

export const NavigateToUrlButton = ({ url }: { url: string }) => {
  return (
    <Button as={Link} size="sm" variant="light" href={url} isExternal>
      <ArrowTopRightOnSquareIcon className="h-6 w-6" />
    </Button>
  );
};
