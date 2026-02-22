import React from "react";

export default function FadeInView({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
