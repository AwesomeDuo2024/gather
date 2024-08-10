"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <div className="w-screen bg-zinc-950">
      <div className="container flex justify-between items-center px-16 lg:px-28 py-6">
        <div className="hover:cursor-pointer">
          <Link href="/" legacyBehavior passHref>
            <Image
              src="../logo.svg"
              width={95}
              height={95}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-8">
              <Link href="/#faq" legacyBehavior passHref>
                <NavigationMenuLink className="text-gray-500 hover:text-gray-200 transition-all">
                  How to use
                </NavigationMenuLink>
              </Link>
              <Link
                href="https://donate.stripe.com/test_00g7uBbfkcjebNm6oo"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className="text-gray-500 hover:text-gray-200 transition-all">
                  Donate
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
