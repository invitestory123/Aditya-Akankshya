import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "./data";

export function MusicPlayer({ autoPlayTrigger }: { autoPlayTrigger?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch(() => {
          // Browser prevented autoplay before user interaction
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Play error:", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={wedding.song.audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              className="bg-card/90 border-gold/40 shadow-luxe hidden items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md sm:flex"
            >
              <Music2 className="text-gold h-3.5 w-3.5 animate-pulse" />
              <span className="text-foreground max-w-[120px] truncate text-[0.65rem] font-medium tracking-wider">
                {wedding.song.title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          aria-label={isPlaying ? "Mute music" : "Play music"}
          className="from-primary to-emerald-ink border-gold/40 shadow-gold text-ivory relative flex h-11 w-11 items-center justify-center rounded-full border bg-gradient-to-br backdrop-blur-sm"
        >
          {isPlaying ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="flex items-center justify-center"
            >
              <Volume2 className="h-4 w-4" />
            </motion.div>
          ) : (
            <VolumeX className="text-ivory/70 h-4 w-4" />
          )}

          {isPlaying && (
            <span className="border-gold/60 absolute inset-0 animate-ping rounded-full border opacity-30" />
          )}
        </motion.button>
      </div>
    </>
  );
}
