"use client";

import {
  SparklesIcon,
  PhotoIcon,
  Squares2X2Icon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import signOut from "@/app/lib/signOut";

export default function NavLinks({ isAdmin }: { isAdmin: boolean }) {
  const links = [
    { name: "Blog", href: "/", icon: Squares2X2Icon },
    { name: "Galeria", href: "/gallery", icon: PhotoIcon },
    { name: "O nas", href: "#", icon: SparklesIcon },
  ];
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="lg:flex lg:justify-center lg:w-full lg:pt-2">
      <div className="fixed z-50 w-full lg:w-fit inset-x-0 lg:inset-x-auto bottom-5 pb-[env(safe-area-inset-bottom)] flex justify-around lg:justify-center items-center self-center h-14 lg:gap-10 lg:min-w-fit lg:bottom-2 bg-amber-900 lg:px-5 lg:rounded-4xl">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx("flex md:gap-2 py-2 px-4", {
                "text-white bg-highlight ": pathname === link.href,
                "hover:text-amber-950": pathname !== link.href,
              })}
            >
              <LinkIcon className="w-4 font-semibold" />
              <p className="hidden md:block text-sm font-semibold">
                {link.name}
              </p>
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            className={clsx("flex md:gap-2 py-2 px-4", {
              "font-bold": pathname === "/admin/dashboard",
              "hover:text-amber-950 hover:rounded":
                pathname !== "/admin/dashboard",
            })}
            href={"/admin/dashboard"}
          >
            <Cog6ToothIcon className="w-4 font-semibold" />
            <span className="hidden md:block text-sm font-semibold">Admin</span>
          </Link>
        )}
        {isAdmin && (
          <button
            className={
              "flex md:gap-2 py-2 px-4 lg:text-2xl hover:text-amber-950 hover:rounded"
            }
            onClick={async () => {
              await signOut();
              router.refresh();
            }}
          >
            <ArrowLeftStartOnRectangleIcon className="w-4 font-semibold" />
            <span className="hidden md:block text-sm font-semibold">
              Wyloguj
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
