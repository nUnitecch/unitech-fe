// import Image from "next/image";
// import FadeInView from "../FadeInView";

// type AboutCardType = {
//   title: string;
//   description: string;
//   imageUrl: string;
// };

// export default function AboutCard({
//   title,
//   description,
//   imageUrl,
// }: AboutCardType) {
//   return (
//     <div className="flex flex-col gap-10 md:flex-row md:justify-center even:flex-row-reverse">
//       <FadeInView className="bg-background text-foreground rounded-[5.85px] overflow-hidden p-5 shadow-lg">
//         <>
//           <h2 className="text-[24px] font-bold mb-5">{title}</h2>
//           <p className="leading-[24.5px]">{description}</p>
//         </>
//       </FadeInView>
//       <FadeInView className="w-full aspect-video rounded-[5.85px] overflow-hidden relative">
//         <Image
//           src={`/images/${imageUrl}`}
//           alt={title}
//           fill
//           className="object-cover object-center"
//           sizes="500px"
//         />
//       </FadeInView>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type AboutCardType = {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
};

export default function AboutCard({
  title,
  description,
  imageUrl,
  index,
}: AboutCardType) {
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-10 md:py-20">
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        className={`flex flex-col gap-6 ${isEven ? "md:order-1" : "md:order-2"}`}
      >
        <div className="space-y-4">
          <h3 className="text-brand font-bold uppercase tracking-widest text-sm">
            0{index + 1}. Perspective
          </h3>
          <h2 className="text-3xl md:text-5xl font-black text-content-strong leading-tight">
            {title}
          </h2>
        </div>
        <p className="text-content-default text-lg leading-relaxed max-w-xl">
          {description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className={`relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl group ${
          isEven ? "md:order-2" : "md:order-1"
        }`}
      >
        <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <Image
          src={`/images/${imageUrl}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        <div className="absolute bottom-6 left-6 right-6 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <p className="text-white font-medium text-sm text-center">
            View Case Study
          </p>
        </div>
      </motion.div>
    </div>
  );
}
