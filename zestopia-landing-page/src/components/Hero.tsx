import heroBg from "@/assets/hero-bg.jpg";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Animated glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-primary/20 rounded-full blur-[80px] sm:blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-secondary/20 rounded-full blur-[60px] sm:blur-[80px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto">
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
          MES M.K. Mackar Pillay College for Advanced Studies, Edathala
        </p>
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secondary mb-4 sm:mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.4s' }}>
          Presents
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 gradient-text text-glow-primary animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
          ZESTOPIA
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/90 font-light mb-3 sm:mb-4 animate-fade-in opacity-0" style={{ animationDelay: '0.8s' }}>
          Where Innovation Meets Celebration
        </p>

        <p className="text-muted-foreground text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-8 sm:mb-12 animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
          Join us for the most electrifying inter-departmental fest of the year.
          Compete, create, and celebrate!
        </p>

        <a
          href="#events"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 gradient-primary rounded-full font-semibold text-sm sm:text-base text-primary-foreground box-glow-primary hover:scale-105 transition-transform duration-300 animate-fade-in opacity-0"
          style={{ animationDelay: '1.2s' }}
        >
          Explore Events
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 animate-float" />
        </a>
      </div>

      {/* Scroll indicator - hidden on small phones */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-float hidden sm:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
