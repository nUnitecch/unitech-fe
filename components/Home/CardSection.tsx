import { FEATURE_CARDS } from "@/constants/landing";
import FeatureCard from "./FeatureCard";
import Container from "../Container";

export default function CardSection() {
  return (
    <Container>
      <div className="px-4 pt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FEATURE_CARDS.map((card, id) => (
          <FeatureCard details={card} key={id} />
        ))}
      </div>
    </Container>
  );
}
