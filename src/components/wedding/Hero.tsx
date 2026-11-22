import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.4 });

  const glowY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const garlandY = useTransform(smooth, [0, 1], ["0%", "38%"]);
  const textY = useTransform(smooth, [0, 1], ["0%", "80%"]);
  const textOpacity = useTransform(smooth, [0, 0.55], [1, 0]);
  const coupleY = useTransform(smooth, [0, 1], ["0%", "-18%"]);
  const coupleScale = useTransform(smooth, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="bg-emerald-deep relative flex h-[100svh] min-h-[640px] w-full flex-col items-center justify-between overflow-hidden pb-8 pt-24"
    >
      <Aurora intensity={1} />
      <div className="from-emerald-ink/50 via-emerald-deep/20 to-emerald-ink/90 absolute inset-0 bg-gradient-to-b" />
      <motion.div
        aria-hidden
        style={{
          y: glowY,
          background:
            "radial-gradient(ellipse at 50% 80%, oklch(0.93 0.05 92 / 0.55), transparent 62%)",
        }}
        className="absolute bottom-0 left-1/2 h-[62%] w-[130%] -translate-x-1/2 rounded-t-full blur-2xl"
      />

      <Petals count={12} />

      <motion.img
        src="https://media.invitestory.in/kerala-sands/images/garland.png"
        alt=""
        aria-hidden
        style={{ y: garlandY }}
        className="pointer-events-none absolute -top-2 left-1/2 w-[135%] max-w-none -translate-x-1/2 opacity-90"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 text-center">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="flex flex-col items-center"
        >
          {/* Sacred Golden Ganesha Emblem */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-2 flex flex-col items-center"
          >
            <img
              src="/images/ganesha.png"
              alt="Lord Ganesha"
              width={68}
              height={95}
              className="h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)]"
            />
            <span className="text-gold-soft font-display mt-0.5 text-[0.6rem] tracking-[0.25em] uppercase">
              || श्री गणेशाय नमः ||
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gold-soft/90 text-[0.6rem] tracking-[0.5em] uppercase"
          >
            Together with their families
          </motion.p>

          {/* Second page: changed font style to Cinzel with refined, smaller font size */}
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-col items-center gap-1"
          >
            <span className="text-gold-foil font-cinzel text-2xl sm:text-3xl font-normal tracking-[0.18em] uppercase">
              {wedding.groom.name}
            </span>
            <span className="font-script text-gold/80 my-0.5 text-2xl font-normal">and</span>
            <span className="text-gold-foil font-cinzel text-2xl sm:text-3xl font-normal tracking-[0.18em] uppercase">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-5 w-32"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-4 flex flex-col items-center gap-1"
          >
            <p className="text-ivory font-display text-sm tracking-[0.25em] uppercase">
              Wedding: 31 Jan 2027 · Cuttack
            </p>
            <p className="text-gold-soft/90 text-[0.7rem] tracking-[0.2em] uppercase font-light">
              Reception: 3 Feb 2027 · Rourkela
            </p>
          </motion.div>
        </motion.div>

        {/* Animated / Cartoon Couple Illustration */}
        <motion.img
          src="/images/hero-couple-cartoon.png"
          alt="Aditya & Akankshya Cartoon Illustration"
          width={1167}
          height={784}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: coupleY, scale: coupleScale }}
          className="mt-auto w-[90%] max-w-[380px] brightness-105 contrast-105 drop-shadow-[0_24px_40px_rgba(0,0,0,0.45)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="text-gold/70 relative z-20 flex flex-col items-center pt-2"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
