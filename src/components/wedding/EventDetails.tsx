import { CalendarPlus, Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { wedding } from "./data";
import { Reveal, Ornament } from "./Reveal";

function icsStamp(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function addToCalendar(event: (typeof wedding.events)[0]) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invite//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${event.tag}@wedding`,
    `DTSTAMP:${icsStamp(new Date().toISOString())}`,
    `DTSTART:${icsStamp(event.iso)}`,
    `DTEND:${icsStamp(event.endIso)}`,
    `SUMMARY:${wedding.groom.name} & ${wedding.bride.name} — ${event.title}`,
    `LOCATION:${event.venueName}, ${event.address}`,
    `DESCRIPTION:With love, we invite you to celebrate the ${event.title} of Aditya & Akankshya.`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `aditya-akankshya-${event.tag.toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function EventDetails() {
  const weddingEvent = wedding.events[0];
  const receptionEvent = wedding.events[1];

  return (
    <section className="relative px-5 py-20">
      <div className="mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="When & Where" />
          <h2 className="text-primary mt-5 text-4xl font-light">The Celebrations</h2>
          <p className="text-muted-foreground mx-auto mt-2 text-xs tracking-wider uppercase">
            Two Beautiful Cities · Two Joyous Occasions
          </p>
        </Reveal>

        {/* 1. Marriage Ceremony (Cuttack) */}
        <Reveal delay={0.1}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <span className="bg-gold/25 text-gold-soft border-gold/40 inline-block rounded-full border px-3 py-1 text-[0.6rem] tracking-[0.3em] uppercase font-medium">
                Wedding Ceremony · Cuttack
              </span>
              <p className="text-ivory font-display mt-3 text-5xl font-light">31</p>
              <p className="text-ivory/90 text-sm tracking-[0.35em] uppercase">
                January 2027
              </p>
              <p className="text-gold-soft/80 mt-1 text-[0.65rem] tracking-[0.2em] uppercase">
                Sunday
              </p>
            </div>

            <div className="divide-gold/15 divide-y">
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Occasion
                  </p>
                  <p className="text-foreground text-sm font-medium">Marriage Ceremony</p>
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
                  <p className="text-foreground text-sm">{weddingEvent.time}</p>
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
                  <p className="text-foreground text-sm font-medium">
                    {weddingEvent.venueName}
                  </p>
                  <p className="text-muted-foreground text-xs">{weddingEvent.city}, Odisha</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 px-6 pt-2 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCalendar(weddingEvent)}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3.5 text-xs tracking-[0.3em] uppercase"
              >
                <CalendarPlus className="h-4 w-4" />
                Add Wedding to Calendar
              </motion.button>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={weddingEvent.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border py-3 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Directions to Krishna Courtyard
              </motion.a>
            </div>
          </div>
        </Reveal>

        {/* 2. Wedding Reception (Rourkela) - Feb 3 */}
        <Reveal delay={0.16}>
          <div className="border-gold/30 bg-card shadow-luxe mt-8 overflow-hidden rounded-[2rem] border">
            <div className="from-emerald-ink/95 via-primary to-emerald-ink bg-gradient-to-br px-6 py-7 text-center">
              <span className="bg-gold/25 text-gold-soft border-gold/40 inline-block rounded-full border px-3 py-1 text-[0.6rem] tracking-[0.3em] uppercase font-medium">
                Wedding Reception · Rourkela
              </span>
              <p className="text-ivory font-display mt-3 text-5xl font-light">03</p>
              <p className="text-ivory/90 text-sm tracking-[0.35em] uppercase">
                February 2027
              </p>
              <p className="text-gold-soft/80 mt-1 text-[0.65rem] tracking-[0.2em] uppercase">
                Wednesday
              </p>
            </div>

            <div className="divide-gold/15 divide-y">
              <div className="flex items-center gap-4 px-6 py-4">
                <span className="bg-secondary text-primary grid h-10 w-10 shrink-0 place-items-center rounded-full">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-[0.6rem] tracking-[0.3em] uppercase">
                    Occasion
                  </p>
                  <p className="text-foreground text-sm font-medium">Wedding Reception</p>
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
                  <p className="text-foreground text-sm">{receptionEvent.time}</p>
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
                  <p className="text-foreground text-sm font-medium">
                    {receptionEvent.venueName}
                  </p>
                  <p className="text-muted-foreground text-xs">{receptionEvent.city}, Odisha</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 px-6 pt-2 pb-6">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => addToCalendar(receptionEvent)}
                className="from-primary to-emerald-ink text-ivory shadow-gold flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r py-3.5 text-xs tracking-[0.3em] uppercase"
              >
                <CalendarPlus className="h-4 w-4" />
                Add Reception to Calendar
              </motion.button>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href={receptionEvent.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="border-gold/50 text-primary hover:bg-secondary inline-flex w-full items-center justify-center gap-2 rounded-full border py-3 text-xs tracking-[0.3em] uppercase transition-colors"
              >
                <Navigation className="h-4 w-4" />
                Directions to Deepti Courtyard
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
