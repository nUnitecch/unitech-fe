import React, { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={`xl:max-w-360 xl:mx-auto ${className}`} {...props}>
      {children}
    </div>
  );
}
