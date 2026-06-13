"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A single sidebar navigation link.
 * Highlights automatically when the pathname matches.
 */
export function NavLink({ href, icon: Icon, label, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200",
        active
          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
          : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-slate-400")} />
      {label}
    </Link>
  );
}
