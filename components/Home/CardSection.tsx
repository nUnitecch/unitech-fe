import { FEATURE_CARDS } from "@/constants/landing";
import FeatureCard from "./FeatureCard";
import Container from "../Container";

export default function CardSection() {
  return (
    <section className="px-6 py-20">
      <Container className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURE_CARDS.map((card, id) => (
          <FeatureCard details={card} key={id} />
        ))}
      </Container>
    </section>
  );
}
