"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { UserButton } from "@clerk/nextjs";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <NavbarBrand>
          <Link
            color="foreground"
            href="/"
            className="font-semibold text-inherit"
          >
            Price Watcher
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* <NavbarContent
        className="hidden sm:flex gap-4"
        justify="end"
      ></NavbarContent> */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link color="foreground" href="/">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem className="lg:flex">
          <UserButton afterSignOutUrl="/" />
        </NavbarItem>
        {/* <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};
