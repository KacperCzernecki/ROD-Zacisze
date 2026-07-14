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
    <div className="bg-amber-900 flex justify-around my-100">
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
      {isAdmin && <Link href={"/admin/dashboard"}>Panel Admina</Link>}
      {isAdmin && (
        <button
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
