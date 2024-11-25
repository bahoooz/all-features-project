// components/Header.tsx
"use client";

import { motion } from "framer-motion";

export default function Light() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-48 h-[80%] blur-3xl bg-white opacity-20 rounded-full pointer-events-none"
      initial={{ x: "-50%" }}
      animate={{
        x: ["-50%", "200%", "-50%"],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
