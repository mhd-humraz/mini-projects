import collegeLogo from "@/assets/mescas-logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img
            src={collegeLogo}
            alt="MES College Logo"
            className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-foreground/10 p-0.5 sm:p-1 object-contain"
          />
          <div className="hidden sm:block">
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
              MES M.K. Mackar Pillay College
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
              for Advanced Studies, Edathala
            </p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-4 md:gap-6">
          <a href="#events" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
            Events
          </a>
          <a href="#location" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
            Location
          </a>
          <a href="#countdown" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300">
            Countdown
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <a href="#events" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
              Events
            </a>
            <a href="#location" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
              Location
            </a>
            <a href="#countdown" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1">
              Countdown
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
