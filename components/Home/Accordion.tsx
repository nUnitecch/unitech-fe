import { FAQ_ITEMS } from "@/constants/landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function AccordionSection() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full grid grid-cols-1 gap-x-5 gap-y-8 last:gap-y-0"
    >
      {FAQ_ITEMS.map((item, id) => (
        <AccordionItem
          key={id}
          value={`item-${id}`}
          className="border-b border-foreground/10"
        >
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent className="leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
