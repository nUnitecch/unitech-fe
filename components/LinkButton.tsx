import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  children: string | React.ReactNode;
  href: string;
  className: string;
};

export default function LinkButton({
  children,
  href,
  className,
}: LinkButtonProps) {
  return (
    <Link href={href} className={`rounded px-2 py-1 ${className}`}>
      {children}
    </Link>
  );
}
