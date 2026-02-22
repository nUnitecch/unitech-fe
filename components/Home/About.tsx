import { ABOUT_SECTIONS } from "@/constants/landing";
import AboutCard from "./AboutCard";
import FAQ from "./FAQ";
import Container from "../Container";

export default function About() {
  return (
    <section className="px-4 py-20">
      <Container>
        <div>
          <div className="py-4 flex flex-col gap-10">
            {ABOUT_SECTIONS.map((card, id) => (
              <AboutCard
                key={id}
                title={card.title}
                description={card.desc}
                imageUrl={card.image}
              />
            ))}
          </div>
          <FAQ />
        </div>
      </Container>
    </section>
  );
}
