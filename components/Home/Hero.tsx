import Image from "next/image";
import LinkButton from "../LinkButton";
import Container from "../Container";

export default function Hero() {
  return (
    <section className="bg-background">
      <Container className="flex flex-col md:flex-row-reverse md:items-center">
        <div className="py-4 px-4 mb-4 w-full">
          <div className="min-w-70 h-70 overflow-hidden relative md:h-90 rounded-xl">
            <Image
              src="/images/heroImg.jpg"
              alt="hero image"
              fill
              priority
              className="object-cover object-center"
              aria-label="hero image"
              sizes="500px"
            />
          </div>
        </div>
        <div className="text-center text-foreground px-4 w-full">
          <div>
            <h1 className="text-2xl text-foreground font-bold mb-4">
              Your Ultimate LASU <br /> Campus Companion
            </h1>
            <p className="my-2 leading-relaxed">
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
            <h2 className="text-xl font-bold mb-4">
              Everything You Need, All in One Place
            </h2>
            <p className="text-primary-text my-2 leading-relaxed">
              Explore the powerful features designed to enhance your academic
              journey and campus experience.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
