// import Image from "next/image";
// import Link from "next/link";
// import Logo from "../Logo";
// import Container from "../Container";
// import LinkButton from "../LinkButton";
// import { FadeFeatureInView } from "../FadeInView";

// export default function Footer() {
//   return (
//     <footer className="bg-logo">
//       <Container>
//         <div className="min-w-50 h-50 relative flex items-center justify-center">
//           <div className="footer-overlay"></div>
//           <Image
//             src="/images/footerImage.jpg"
//             alt="footer image"
//             fill
//             className="object-cover"
//             sizes="500px"
//           />
//           <FadeFeatureInView className="w-[80%] relative z-50 text-center">
//             <p className="text-background mb-4 text-[12px]">
//               Whatever your campus needs, My LASU App’s got you covered, helping
//               you stay organized, informed, and ready for anything LASU throws
//               your way.
//             </p>
//             <LinkButton
//               href="/auth/signup"
//               className="bg-background text-foreground text-sm"
//             >
//               Sign up today!
//             </LinkButton>
//           </FadeFeatureInView>
//         </div>
//         <FadeFeatureInView className="text-white py-10 px-4 md:flex md:gap-5">
//           <div className="w-full">
//             <div className="w-45 mb-2">
//               <Logo />
//             </div>
//             <p className="mb-5">Your Ultimate Campus Companion.</p>
//             <ul className="flex flex-col mb-7">
//               {["About", "Careers", "Hubs", "Customer Care", "Services"].map(
//                 (link, index) => (
//                   <li key={index}>
//                     <Link href="">{link}</Link>
//                   </li>
//                 ),
//               )}
//             </ul>
//           </div>
//           <div className="md:px-4">
//             <p className="lg:text-nowrap">
//               Get to know when other features are open.
//             </p>
//             <div className="my-4 flex flex-col md:flex-row flex-wrap gap-2 md:flex-nowrap">
//               <input
//                 type="text"
//                 placeholder="Lorem is a demo text"
//                 className="bg-background p-2 rounded outline-none"
//               />
//               <button className="rounded px-4 py-2 bg-foreground">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </FadeFeatureInView>
//       </Container>
//     </footer>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
import Container from "../Container";
import LinkButton from "../LinkButton";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-logo relative overflow-hidden">
      {/* CTA SECTION */}
      <div className="relative h-100 w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/footerImage.jpg"
          alt="LASU Campus"
          fill
          className="object-cover brightness-[0.4]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-logo via-transparent to-transparent" />

        <Container className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
              Stay organized, informed, and <br className="hidden md:block" />
              ready for anything.
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Whatever your campus needs, My LASU App has you covered.
            </p>
            <LinkButton
              href="/auth/signup"
              className="bg-white text-logo hover:bg-white/90 px-8 py-4 rounded-full font-bold shadow-xl transition-transform active:scale-95"
            >
              Sign up today!
            </LinkButton>
          </motion.div>
        </Container>
      </div>

      {/* 2. MAIN FOOTER CONTENT */}
      <Container className="pt-20 pb-10 text-white px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="w-40 mb-6">
              <Logo />
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Empowering Lagos State University students with digital tools for
              a seamless campus experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {["About", "Careers", "Services", "Customer Care"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-white/70 mb-6">
              Subscribe to get notified when new features and hubs are launched.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your student email"
                className="flex-1 bg-background/10 border border-background/20 rounded-xl px-4 py-3 text-background placeholder:text-background/40 outline-none focus:border-background/50 transition-colors"
                required
              />
              <button className="bg-white text-logo font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* 3. BOTTOM BAR */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© {currentYear} My LASU App. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
