"use client";

import * as React from "react";
import Link from "next/link";

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
        <p className="text-white">Gather</p>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-8">
              <Link href="/#faq" legacyBehavior passHref>
                <NavigationMenuLink className="text-gray-500 hover:text-gray-200 transition-all">
                  How to use
                </NavigationMenuLink>
              </Link>
              <Link href="/docs" legacyBehavior passHref>
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
