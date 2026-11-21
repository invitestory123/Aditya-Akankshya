import { wedding } from "./data";
import { Parallax } from "./Parallax";
import { Reveal, Ornament } from "./Reveal";

function Person({
  person,
  role,
}: {
  person: typeof wedding.bride;
  role: string;
}) {
  return (
    <Reveal className="relative">
      <div className="bg-card/70 border-gold/30 shadow-luxe relative overflow-hidden rounded-[2rem] border p-6 backdrop-blur-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "url('https://media.invitestory.in/kerala-sands/images/mandala-texture.jpg')",
            backgroundSize: "cover",
          }}
        />
        <div className="relative flex flex-col items-center text-center">
          <div className="from-gold/25 relative h-48 w-48 overflow-hidden rounded-full border-2 border-gold/50 bg-gradient-to-b to-transparent p-1 shadow-inner">
            <img
              src={person.image}
              alt={person.fullName}
              loading="lazy"
              width={480}
              height={480}
              className="h-full w-full rounded-full object-cover object-center transition-transform duration-500 hover:scale-105"
            />
          </div>
          <span className="text-gold mt-5 text-[0.6rem] tracking-[0.45em] uppercase font-medium">
            {role}
          </span>
          <h3 className="text-primary mt-2 text-3xl font-light">{person.fullName}</h3>
          <p className="text-muted-foreground mt-1 text-xs tracking-wide">{person.line}</p>
          <span className="rule-gold my-4 w-20" />
          <p className="text-foreground/75 text-sm leading-relaxed">{person.note}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Couple() {
  return (
    <section className="relative overflow-hidden px-5 py-20">
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -top-6 -left-10 w-44 opacity-40"
      />
      <img
        src="https://media.invitestory.in/kerala-sands/images/floral-corner.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -right-10 -bottom-6 w-44 rotate-180 opacity-40"
      />

      <div className="relative mx-auto max-w-md">
        <Reveal className="text-center">
          <Ornament label="The Couple" />
          <h2 className="text-primary mt-5 text-4xl font-light">Two hearts, one story</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xs text-sm leading-relaxed">
            Seven sacred vows, two loving families, and a lifetime of happiness together.
          </p>
        </Reveal>

        <div className="mt-10 space-y-8">
          {/* Groom Photo */}
          <Parallax speed={26}>
            <Person person={wedding.groom} role="The Groom" />
          </Parallax>

          <div className="flex justify-center">
            <span className="font-script text-gold animate-float-soft text-5xl">&amp;</span>
          </div>

          {/* Bride Photo */}
          <Parallax speed={-26}>
            <Person person={wedding.bride} role="The Bride" />
          </Parallax>
        </div>

        {/* Combined Couple Photo */}
        <Reveal delay={0.2} className="mt-12">
          <div className="border-gold/30 bg-card/70 shadow-luxe relative overflow-hidden rounded-[2rem] border p-4 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-gold/25">
              <img
                src={wedding.combinedCoupleImage}
                alt="Aditya & Akankshya Together"
                loading="lazy"
                width={746}
                height={1024}
                className="h-96 w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="from-black/75 via-black/20 to-transparent absolute inset-0 bg-gradient-to-t flex items-end p-5">
                <div className="text-center w-full">
                  <p className="font-script text-gold-foil text-3xl">Aditya &amp; Akankshya</p>
                  <p className="text-ivory/80 text-[0.65rem] tracking-[0.3em] uppercase mt-1">Together Forever</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
