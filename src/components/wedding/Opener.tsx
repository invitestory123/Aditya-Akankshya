import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Aurora } from "@/components/Aurora";
import { Petals } from "./Petals";
import { wedding } from "./data";

/**
 * Full-screen "seal + curtain" opener. Tapping the wax seal splits the
 * gold curtains and reveals the invitation.
 */
export function Opener({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Curtains */}
      {[-1, 1].map((dir) => (
        <motion.div
          key={dir}
          className="bg-emerald-ink absolute inset-y-0 w-[51%] overflow-hidden"
          style={{ [dir === -1 ? "left" : "right"]: 0 }}
          animate={opening ? { x: `${dir * 105}%` } : { x: 0 }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        >
          <Aurora intensity={0.55} />
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('https://media.invitestory.in/kerala-sands/images/mandala-texture.jpg')",
              backgroundSize: "cover",
              backgroundPosition: dir === -1 ? "right center" : "left center",
            }}
          />
          <div
            className="absolute inset-y-0 w-[2px]"
            style={{
              [dir === -1 ? "right" : "left"]: 0,
              background: "var(--gradient-gold)",
            }}
          />
        </motion.div>
      ))}

      <Petals count={10} />

      <AnimatePresence>
        {!opening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-5 flex w-full max-w-[340px] flex-col items-center rounded-3xl border border-gold/40 bg-emerald-ink/95 px-7 py-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.75)] backdrop-blur-md"
          >
            {/* Lord Ganesha on First Page */}
            <div className="mb-3 flex flex-col items-center">
              <img
                src="/images/ganesha.png"
                alt="Lord Ganesha"
                width={64}
                height={89}
                className="h-16 w-auto object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]"
              />
              <span className="text-gold-soft font-display mt-1 text-[0.6rem] tracking-[0.25em] uppercase">
                || श्री गणेशाय नमः ||
              </span>
            </div>

            <span className="text-gold/80 text-[0.5rem] tracking-[0.45em] uppercase">
              A Wedding Invitation
            </span>

            {/* Symmetrically stacked names so the curtain line never cuts through Akankshya */}
            <div className="mt-3 flex flex-col items-center leading-tight">
              <span className="text-gold-foil font-cinzel text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase">
                {wedding.groom.name}
              </span>
              <span className="font-script text-gold/80 my-0.5 text-2xl font-normal">&amp;</span>
              <span className="text-gold-foil font-cinzel text-2xl sm:text-3xl font-light tracking-[0.16em] uppercase">
                {wedding.bride.name}
              </span>
            </div>

            <span className="rule-gold mt-4 w-24" />

            <motion.button
              onClick={open}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              className="group relative mt-6 grid h-20 w-20 place-items-center cursor-pointer"
              aria-label="Open the invitation"
            >
              <motion.span
                className="border-gold/40 absolute inset-0 rounded-full border"
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ repeat: Infinity, duration: 2.6, ease: "easeOut" }}
              />
              <motion.span
                className="shadow-gold grid h-16 w-16 place-items-center rounded-full"
                style={{ backgroundImage: "var(--gradient-gold)" }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
              >
                <span className="font-script text-emerald-ink text-2xl leading-none font-bold">
                  {wedding.groom.name[0]}
                  {wedding.bride.name[0]}
                </span>
              </motion.span>
            </motion.button>

            <motion.p
              className="text-ivory/60 mt-4 text-[0.55rem] tracking-[0.35em] uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.4 }}
            >
              Tap the seal to open
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
