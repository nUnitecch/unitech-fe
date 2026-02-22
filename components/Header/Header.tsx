import Logo from "../Logo";
import LinkButton from "../LinkButton";
import Container from "../Container";

export default function Header() {
  return (
    <header className="w-full shadow-md">
      <Container className="flex items-center justify-between gap-[10.23px] p-4">
        <div className="flex flex-col gap-1">
          <span className="block w-6 bg-foreground h-0.5 rounded"></span>
          <span className="block w-6 bg-foreground h-0.5 rounded"></span>
          <span className="block w-6 bg-foreground h-0.5 rounded"></span>
        </div>
        <Logo />
        <LinkButton
          href="/auth/signin"
          className="bg-foreground text-background"
        >
          Sign in
        </LinkButton>
      </Container>
    </header>
  );
}
