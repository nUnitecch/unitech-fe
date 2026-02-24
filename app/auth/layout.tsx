import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full max-w-xl mx-auto">
        <Link
          href="/"
          className="flex items-center text-logo px-4 sm:px-6 py-3"
        >
          <ArrowLeft className="size-4 mr-2" /> Home
        </Link>
        <div>{children}</div>
      </div>
    </div>
  );
}
