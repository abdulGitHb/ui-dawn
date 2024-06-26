"use client";

import HeroBgGradient from "@/components/HeroBgGradient";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroBgGradientClient () {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <HeroBgGradient
        height={isInView ? 444 : 0}
        className="absolute inset-x-0 mx-auto duration-500 top-0 -translate-x-32 sm:-translate-x-10"
      />
    </div>
  );
};