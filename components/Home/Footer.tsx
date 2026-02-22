import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import Container from "../Container";
import LinkButton from "../LinkButton";

export default function Footer() {
  return (
    <footer className="bg-logo/80">
      <Container>
        <div className="min-w-50 h-50 relative flex items-center justify-center">
          <div className="footer-overlay"></div>
          <Image
            src="/images/footerImage.jpg"
            alt="footer image"
            fill
            className="object-cover"
            sizes="500px"
          />
          <div className="w-[80%] relative z-50 text-center">
            <p className="text-background mb-4 text-[12px]">
              Whatever your campus needs, My LASU App’s got you covered, helping
              you stay organized, informed, and ready for anything LASU throws
              your way.
            </p>
            <LinkButton
              href="/auth/signup"
              className="bg-background text-foreground"
            >
              Sign up today!
            </LinkButton>
          </div>
        </div>
        <div className="text-white py-10 px-4">
          <div className="w-45 mb-2">
            <Logo />
          </div>
          <p className="mb-5">Your Ultimate Campus Companion.</p>
          <ul className="flex flex-col mb-7">
            <li>
              <Link href="">About</Link>
            </li>
            <li>
              <Link href="">Careers</Link>
            </li>
            <li>
              <Link href="">Hubs</Link>
            </li>
            <li>
              <Link href="">Customer Care</Link>
            </li>
            <li>
              <Link href="">Services</Link>
            </li>
          </ul>
          <div>
            <p>Get to know when other features are open.</p>
            <div className="my-4 flex flex-col md:flex-row flex-wrap gap-2">
              <input
                type="text"
                placeholder="Lorem is a demo text"
                className="bg-background p-2 rounded"
              />
              <button className="rounded px-4 py-2 bg-logo">Subscribe</button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
