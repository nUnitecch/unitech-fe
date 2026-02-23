import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center py-2 px-4 shadow-sm bg-white rounded-lg"
    >
      <div className="relative size-[19.18px] mr-2">
        <Image
          src="/icons/logo.png"
          alt="logo icon"
          fill
          className="object-contain"
          sizes="300px"
        />
      </div>
      <span className="text-logo text-[12.79px] ml-2 font-semibold">
        My Lasu App
      </span>
    </Link>
  );
}
