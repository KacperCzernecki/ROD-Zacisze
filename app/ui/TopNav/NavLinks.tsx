"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import signOut from "@/app/lib/signOut";
import { useEffect, useState } from "react";

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const links = [
    { name: "Strona główna", href: "/" },
    { name: "Galeria", href: "/gallery" },
  ];
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log(isHovered);
  }, [isHovered]);
  return (
    <div
      className="flex justify-center w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="fixed bottom-3 flex translate-11 justify-center items-center self-center gap-10 bg-amber-900 px-5 rounded-4xl hover:translate-y-0 hover:flex">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx("text-2xl", {
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
            className={clsx("text-2xl", {
              "font-bold": pathname === "/admin/dashboard",
              "hover:text-amber-950 hover:rounded":
                pathname !== "/admin/dashboard",
            })}
            href={"/admin/dashboard"}
          >
            Panel Admina
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
