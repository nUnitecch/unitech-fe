import { ABOUT_SECTIONS } from "@/constants/landing";
import AboutCard from "./AboutCard";
import Container from "../Container";

export default function About() {
  return (
    <section className="relative overflow-hidden py-10">
      <Container>
        <div className="px-6 flex flex-col">
          {ABOUT_SECTIONS.map((card, id) => (
            <AboutCard
              key={id}
              index={id}
              title={card.title}
              description={card.desc}
              imageUrl={card.image}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
