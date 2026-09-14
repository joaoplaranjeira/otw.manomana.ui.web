import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  full?: boolean;
};

export function Button({ children, href, variant = "primary", full, className = "", ...props }: Props) {
  const classes = `button button--${variant} ${full ? "button--full" : ""} ${className}`;
  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button className={classes} {...props}>{children}</button>;
}
