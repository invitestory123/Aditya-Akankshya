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
  const coupleY = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const coupleScale = useTransform(smooth, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="bg-emerald-deep relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden pb-12 pt-28"
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
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="text-gold-soft/90 text-[0.6rem] tracking-[0.5em] uppercase"
          >
            Together with their families
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 flex flex-col items-center leading-[0.82]"
          >
            <span className="text-gold-foil font-display text-[4rem] font-light sm:text-[4.25rem]">
              {wedding.groom.name}
            </span>
            <span className="font-script text-gold/80 my-1 text-3xl">and</span>
            <span className="text-gold-foil font-display text-[4rem] font-light sm:text-[4.25rem]">
              {wedding.bride.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="rule-gold mt-6 w-40"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9 }}
            className="mt-4 flex flex-col items-center gap-1"
          >
            <p className="text-ivory font-display text-base tracking-[0.25em] uppercase">
              Wedding: 31 Jan 2027 · Cuttack
            </p>
            <p className="text-gold-soft/90 text-xs tracking-[0.2em] uppercase font-light">
              Reception: 3 Feb 2027 · Rourkela
            </p>
          </motion.div>
        </motion.div>

        {/* 1st image: Hero Couple in Royal Arched Frame right after opening */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: coupleY, scale: coupleScale }}
          className="relative mt-8 w-full max-w-[330px] overflow-hidden rounded-t-[7rem] rounded-b-[2rem] border-2 border-gold/50 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent p-1.5 shadow-[0_25px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm"
        >
          <div className="relative overflow-hidden rounded-t-[6.5rem] rounded-b-[1.7rem]">
            <img
              src={wedding.heroCoupleImage}
              alt="Aditya & Akankshya"
              width={730}
              height={824}
              className="h-full w-full object-cover object-top brightness-105 contrast-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-emerald-ink/70 via-transparent to-transparent flex items-end justify-center pb-4">
              <span className="font-script text-gold-foil text-2xl tracking-wide">
                Aditya &amp; Akankshya
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ opacity: textOpacity }}
        className="text-gold/70 relative z-20 flex flex-col items-center pt-4"
      >
        <span className="text-[0.55rem] tracking-[0.4em] uppercase">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
