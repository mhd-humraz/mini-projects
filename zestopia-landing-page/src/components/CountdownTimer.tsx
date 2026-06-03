import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-04-18T10:00:00+05:30").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = Date.now();
    const diff = TARGET_DATE - now;
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = timeLeft
    ? [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Min", value: timeLeft.minutes },
        { label: "Sec", value: timeLeft.seconds },
      ]
    : [];

  return (
    <section id="countdown" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-primary/80 mb-2 block">
            Mark Your Calendar
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2">
            The Countdown Begins
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            April 18, 2026 • 10:00 AM IST
          </p>
        </div>

        {timeLeft ? (
          <div className="flex justify-center gap-2.5 sm:gap-4 md:gap-8">
            {units.map((unit, i) => (
              <div key={unit.label} className="relative group flex-1 max-w-[120px]">
                <div className="absolute -inset-1 rounded-xl bg-primary/8 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative rounded-xl border border-primary/10 bg-primary/[0.04] backdrop-blur-md p-3 sm:p-5 md:p-8 text-center">
                  {/* Top accent */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-[2px] gradient-primary rounded-full" />
                  <span
                    className="text-3xl sm:text-5xl md:text-6xl font-extrabold gradient-text leading-none block tracking-tight"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="block mt-2 sm:mt-3 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <div className="absolute -right-1.5 sm:-right-2.5 md:-right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 sm:gap-1.5 z-10">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50" />
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="font-display text-4xl md:text-6xl font-bold gradient-text animate-pulse-glow">
              ZESTOPIA IS LIVE 🚀
            </h3>
            <a
              href="#register"
              className="inline-block gradient-primary text-primary-foreground font-display font-semibold text-lg px-10 py-4 rounded-xl box-glow-primary hover:scale-105 transition-transform duration-300"
            >
              Register Now
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountdownTimer;
