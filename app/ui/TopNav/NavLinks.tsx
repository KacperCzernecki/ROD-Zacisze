"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import signOut from "@/app/lib/signOut";
import { useEffect, useState } from "react";

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const links = [
    { name: "Blog", href: "/" },
    { name: "Galeria", href: "/gallery" },
    { name: "O nas", href: "#" },
  ];
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="lg:flex lg:justify-center lg:w-full pt-2">
      <div className="fixed w-full lg:w-fit inset-x-0 lg:inset-x-auto bottom-0 pb-[env(safe-area-inset-bottom)] justify-between flex lg:justify-center items-center self-center lg:gap-10 lg:min-w-fit lg:bottom-2 bg-amber-900 px-5 lg:rounded-4xl">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx("", {
                "font-bold": pathname === link.href,
                "hover:text-amber-950 hover:rounded": pathname !== link.href,
              })}
            >
              <p>{link.name}</p>
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            className={clsx("", {
              "font-bold": pathname === "/admin/dashboard",
              "hover:text-amber-950 hover:rounded":
                pathname !== "/admin/dashboard",
            })}
            href={"/admin/dashboard"}
          >
            Admin
          </Link>
        )}
        {isAdmin && (
          <button
            className={"text-2xl hover:text-amber-950 hover:rounded"}
            onClick={async () => {
              await signOut();
              router.refresh();
            }}
          >
            Wyloguj
          </button>
        )}
      </div>
    </div>
  );
}
