import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import collegeLogo from "@/assets/mescas-logo.png";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={collegeLogo}
              alt="MES College Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-foreground/10 p-0.5 sm:p-1 object-contain"
            />
            <div className="text-center sm:text-left">
              <h3 className="font-display text-lg sm:text-xl font-bold gradient-text">
                ZESTOPIA
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight mt-1">
                MES M.K. Mackar Pillay College<br />
                for Advanced Studies, Edathala
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Twitter, label: "Twitter" },
              { icon: Mail, label: "Email" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/30 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © 2025 ZESTOPIA. All rights reserved. Made with passion by the IF Dept.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
