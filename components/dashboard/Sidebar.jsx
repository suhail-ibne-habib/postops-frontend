"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  Briefcase,
  BarChart3,
  Settings,
  HelpCircle,
  PlusCircle,
  X,
  Menu,
} from "lucide-react";
import { NavLink } from "@/components/dashboard/NavLink";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// All nav items defined once, shared by desktop and mobile drawers
const PRIMARY_NAV = [
  { href: "/dashboard",      label: "Dashboard",     icon: LayoutDashboard },
  { href: "/campaigns",      label: "Campaigns",     icon: Megaphone },
  { href: "/ai-editor",      label: "AI Editor",     icon: Sparkles },
  { href: "/business-setup", label: "Business Setup",icon: Briefcase },
  { href: "/analytics",      label: "Analytics",     icon: BarChart3 },
];

const SECONDARY_NAV = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/support",  label: "Support",  icon: HelpCircle },
];

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/10">
        <Sparkles className="h-5 w-5 fill-white/10" />
      </div>
      <div>
        <p className="text-sm font-extrabold tracking-tight text-white leading-none">PostOps</p>
        <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-1">
          AI OPERATIONS
        </p>
      </div>
    </div>
  );
}

function SidebarContent({ pathname, onLinkClick }) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-3 py-4 gap-1">
      {/* Primary navigation */}
      <nav className="flex flex-col gap-0.5">
        {PRIMARY_NAV.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={pathname === item.href || pathname.startsWith(item.href + "/")}
            onClick={onLinkClick}
          />
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        {/* New Campaign CTA */}
        <Button asChild size="sm" className="w-full gap-2 justify-center bg-[#C7D2FE] text-[#1E1B4B] hover:bg-[#B4C3FE] border-0 font-semibold shadow-sm transition-all duration-200">
          <Link href="/campaigns/workflow-planner" onClick={onLinkClick}>
            <span className="text-lg font-light leading-none">+</span>
            New Campaign
          </Link>
        </Button>

        <Separator />

        {/* Secondary navigation */}
        <nav className="flex flex-col gap-0.5">
          {SECONDARY_NAV.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={pathname === item.href}
              onClick={onLinkClick}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}

/** Desktop-only fixed sidebar */
function DesktopSidebar({ pathname }) {
  return (
    <aside className="hidden md:flex md:flex-col md:w-60 md:shrink-0 bg-sidebar border-r border-sidebar-border h-full">
      <div className="px-4 h-16 flex items-center border-b border-sidebar-border/50">
        <BrandLogo />
      </div>
      <SidebarContent pathname={pathname} />
    </aside>
  );
}

/** Mobile overlay drawer */
function MobileDrawer({ open, onClose, pathname }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="relative flex flex-col w-64 bg-sidebar border-r border-sidebar-border h-full">
        <div className="px-4 h-16 flex items-center justify-between border-b border-sidebar-border/50">
          <BrandLogo />
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close menu">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <SidebarContent pathname={pathname} onLinkClick={onClose} />
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <DesktopSidebar pathname={pathname} />
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />

      {/* Mobile menu toggle — rendered into the Header via a slot isn't straightforward,
          so we expose a trigger button consumers can reference */}
      <button
        id="mobile-menu-trigger"
        className="hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      />
    </>
  );
}

/** Standalone mobile trigger for use inside the Header */
export function MobileMenuTrigger() {
  return (
    <button
      className="md:hidden p-2 -ml-1 text-muted-foreground hover:text-foreground rounded-lg"
      onClick={() => document.getElementById("mobile-menu-trigger")?.click()}
      aria-label="Open navigation menu"
    >
      <Menu className="h-5 w-5" />
    </button>
  );
}
