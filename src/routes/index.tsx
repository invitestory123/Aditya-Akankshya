import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Hero } from "@/components/wedding/Hero";
import { Couple } from "@/components/wedding/Couple";
import { Countdown } from "@/components/wedding/Countdown";
import { EventDetails } from "@/components/wedding/EventDetails";
import { Footer } from "@/components/wedding/Footer";
import { Opener } from "@/components/wedding/Opener";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";

const title = "Aditya & Akankshya · Wedding Invitation";
const description =
  "Together with their families, Aditya (Munu) and Akankshya (Kunmun) invite you to celebrate their wedding on 31 January 2027 at Krishna Courtyard, Cuttack, and reception on 3 February 2027 at Deepti Courtyard, Rourkela.";
const ogImage = "/images/og-image.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Aditya & Akankshya Wedding Invitation" },
      { property: "og:site_name", content: "InviteStory" },

      // Twitter Cards
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <Opener key="opener" onOpen={() => setOpened(true)} />}
      </AnimatePresence>

      {opened && <ScrollProgress />}

      <motion.main
        initial={{ opacity: 0, scale: 1.03 }}
        animate={opened ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="bg-background mx-auto w-full max-w-[520px] overflow-hidden"
      >
        <Hero />
        <Couple />
        <Countdown />
        <EventDetails />
        <Footer />
      </motion.main>

      <MusicPlayer autoPlayTrigger={opened} />
    </>
  );
}
