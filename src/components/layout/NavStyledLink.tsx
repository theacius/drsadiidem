"use client";

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { navLabelStyleToCss, type NavLabelStyle } from "@/lib/nav-label-style";

type LinkProps = {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
  style?: NavLabelStyle;
  onClick?: () => void;
};

export function NavStyledLink({ href, children, active, className, style, onClick }: LinkProps) {
  const inline = navLabelStyleToCss(style);
  return (
    <Link
      href={href as Parameters<typeof Link>[0]["href"]}
      onClick={onClick}
      data-active={active ? "true" : undefined}
      className={cn("nav-fusion-link", className)}
      style={inline as CSSProperties}
    >
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
  style?: NavLabelStyle;
};

export const NavStyledButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, active, className, style, ...props }, ref) => {
    const inline = navLabelStyleToCss(style);
    return (
      <button
        ref={ref}
        type="button"
        data-active={active ? "true" : undefined}
        className={cn("nav-fusion-link", className)}
        style={inline as CSSProperties}
        {...props}
      >
        {children}
      </button>
    );
  },
);
NavStyledButton.displayName = "NavStyledButton";
