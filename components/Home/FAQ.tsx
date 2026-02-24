import AccordionSection from "./Accordion";
import Container from "../Container";
import { FadeFeatureInView } from "../FadeInView";

export default function FAQ() {
  return (
    <div className="pt-20 pb-10">
      <Container>
        <FadeFeatureInView>
          <h2 className="text-[24px] text-center font-bold mb-4">
            Frequent Asked Questions
          </h2>
          <AccordionSection />
        </FadeFeatureInView>
      </Container>
    </div>
  );
}
