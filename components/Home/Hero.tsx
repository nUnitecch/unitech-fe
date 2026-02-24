// import Image from "next/image";
// import LinkButton from "../LinkButton";
// import Container from "../Container";
// import FadeInView from "../FadeInView";

// export default function Hero() {
//   return (
//     <section className="bg-background py-5 px-4">
//       <Container className="flex flex-col gap-10 md:flex-row-reverse md:items-center">
//         <FadeInView className="mb-4 w-full md:mb-0">
//           <div className="min-w-70 h-70 overflow-hidden relative md:h-90 rounded-xl">
//             <Image
//               src="/images/heroImg.jpg"
//               alt="hero image"
//               fill
//               priority
//               className="object-cover object-center"
//               aria-label="hero image"
//               sizes="500px"
//             />
//           </div>
//         </FadeInView>
//         <FadeInView className="text-center text-foreground px-4 w-full">
//           <div>
//             <h1 className="text-2xl text-foreground font-bold mb-4">
//               Your Ultimate LASU <br /> Campus Companion
//             </h1>
//             <p className="my-2 leading-relaxed">
//               The official app for Lagos State University(LASU), designed to
//               simplify your student life and keep you connected.
//             </p>
//             <LinkButton
//               href="auth/signup"
//               className="inline-block bg-logo text-white my-4"
//             >
//               Sign up
//             </LinkButton>
//           </div>
//           <div className="mt-2">
//             <h2 className="text-xl font-bold mb-4">
//               Everything You Need, All in One Place
//             </h2>
//             <p className="text-primary-text my-2 leading-relaxed">
//               Explore the powerful features designed to enhance your academic
//               journey and campus experience.
//             </p>
//           </div>
//         </FadeInView>
//       </Container>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LinkButton from "../LinkButton";
import Container from "../Container";

export default function Hero() {
  return (
    <section className="relative bg-background pt-10 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-logo/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <Container className="flex flex-col gap-12 md:flex-row-reverse md:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-square md:aspect-4/5 w-full max-w-125 mx-auto overflow-hidden rounded-3xl shadow-2xl border border-foreground/10">
            <Image
              src="/images/heroImg.jpg"
              alt="LASU Campus Life"
              fill
              priority
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 backdrop-blur-md bg-background/10 border border-background/20 rounded-2xl hidden md:block">
              <p className="text-logo text-sm font-medium">
                Join 10,000+ LASU Students today 🎓
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-logo/10 text-logo text-xs font-bold uppercase tracking-widest">
            The Official Campus App
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-foreground leading-[1.1] mb-6 tracking-tight">
            Your Ultimate <br />
            <span className="text-logo">LASU Campus</span> <br />
            Companion
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto md:mx-0">
            Designed to simplify your student life, keep you connected, and
            enhance your academic journey at Lagos State University.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 justify-center md:justify-start">
            <LinkButton
              href="auth/signup"
              className="bg-logo text-white px-8 py-4 rounded-xl shadow-lg shadow-logo/30 hover:shadow-logo/40 transition-all active:scale-95"
            >
              Get Started for Free
            </LinkButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
