import Image from "next/image";
import LinkButton from "../LinkButton";
import Container from "../Container";

export default function Hero() {
  return (
    <Container>
      <div className="py-4">
        <div className="min-w-75.5 h-70 overflow-hidden relative">
          <Image
            src="/images/heroImg.jpg"
            alt="hero image"
            fill
            className="object-cover object-center"
            aria-label="hero image"
          />
        </div>
      </div>
      <div className="text-center text-foreground px-4">
        <div>
          <h1 className="text-[28px] text-foreground font-bold min-w-75.5 mb-2">
            Your Ultimate LASU Campus Companion
          </h1>
          <p className="text-[16px] my-2">
            The official app for Lagos State University(LASU), designed to
            simplify your student life and keep you connected.
          </p>
          <LinkButton
            href="auth/signup"
            className="inline-block bg-logo text-white my-4"
          >
            Sign up
          </LinkButton>
        </div>
        <div className="mt-2">
          <h2 className="text-[22px] font-bold">
            Everything You Need, All in One Place
          </h2>
          <p className="text-primary-text text-[16px] my-2">
            Explore the powerful features designed to enhance your academic
            journey and campus experience.
          </p>
        </div>
      </div>
    </Container>
  );
}
