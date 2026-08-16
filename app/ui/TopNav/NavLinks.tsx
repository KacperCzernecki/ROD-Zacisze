"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import signOut from "@/app/lib/signOut";
export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const links = [
    { name: "Strona główna", href: "/" },
    { name: "Galeria", href: "/gallery" },
  ];
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="fixed bottom-3 flex self-center gap-10 bg-amber-900 px-5 rounded-4xl">
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
  );
}
