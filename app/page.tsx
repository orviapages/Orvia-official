import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Manifesto } from "@/components/sections/Manifesto";
import { Solution } from "@/components/sections/Solution";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Comparison } from "@/components/sections/Comparison";
import { Differentiator } from "@/components/sections/Differentiator";
import { Team } from "@/components/sections/Team";
import { Process } from "@/components/sections/Process";
import { Tech } from "@/components/sections/Tech";
import { Businesses } from "@/components/sections/Businesses";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Manifesto />
      <Solution />
      <Portfolio />
      <Services />
      <Comparison />
      <Differentiator />
      <Team />
      <Process />
      <Tech />
      <Businesses />
      <Testimonials />
      <Faq />
      <CtaFinal />
      <Contact />
    </>
  );
}
