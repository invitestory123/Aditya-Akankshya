import { CalendarPlus, Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(wedding.dateISO)}`,
    `DTEND:${icsStamp(wedding.endISO)}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — Wedding`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    "DESCRIPTION:With love, we invite you to celebrate the wedding of Aditya & Akankshya.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "aditya-akankshya-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="When & Where" />
          <h2 className="text-primary mt-5 text-4xl font-light">The Celebrations</h2>
        </Reveal>

        {/* Wedding Ceremony */}
        <Reveal delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <span className="bg-gold/20 text-gold-soft border-gold/40 inline-block rounded-full border px-3 py-1 text-[0.6rem] tracking-[0.3em] uppercase">
                Marriage Ceremony
              </span>
              <p className="text-ivory font-display mt-3 text-5xl font-light">31</p>
              <p className="text-ivory/85 text-sm tracking-[0.35em] uppercase">
                January 2027
              </p>
            </div>

            <div className="divide-gold/15 divide-y">
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Ceremony
                  </p>
                  <p className="text-foreground truncate text-sm">Wedding Ceremony</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Time
                  </p>
                  <p className="text-foreground truncate text-sm">{wedding.timeLabel}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Venue
                  </p>
                  <p className="text-foreground truncate text-sm">
                    {wedding.venue.name}, {wedding.venue.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-6 pt-2 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={addToCalendar}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3.5 text-xs tracking-[0.3em] uppercase"
              >
                <CalendarPlus className="h-4 w-4" />
                Add to calendar
              </motion.button>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={wedding.venue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border py-3 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Directions to Wedding
              </motion.a>
            </div>
          </div>
        </Reveal>

        {/* Reception Venue */}
        <Reveal delay={0.16}>
          <div className="border-gold/30 bg-card shadow-luxe mt-6 overflow-hidden rounded-[2rem] border">
            <div className="from-emerald-ink/90 to-primary/80 bg-gradient-to-br px-6 py-6 text-center">
              <span className="bg-gold/20 text-gold-soft border-gold/40 inline-block rounded-full border px-3 py-1 text-[0.6rem] tracking-[0.3em] uppercase">
                Reception
              </span>
              <h3 className="text-ivory font-display mt-2 text-3xl font-light">
                {wedding.receptionVenue.name}
              </h3>
              <p className="text-ivory/80 text-xs tracking-[0.25em] uppercase mt-1">
                {wedding.receptionVenue.address}
              </p>
            </div>

            <div className="divide-gold/15 divide-y">
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <MapPin className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Location
                  </p>
                  <p className="text-foreground text-sm font-medium">
                    {wedding.receptionVenue.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {wedding.receptionVenue.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 pt-2 pb-6">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={wedding.receptionVenue.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border py-3.5 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Directions to Reception
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
