import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocationSection = () => {
  const coordinates = { lat: 10.07, lng: 76.38 };
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDA0JzEyLjAiTiA3NsKwMjInNDguMCJF!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin`;

  return (
    <section id="location" className="py-16 sm:py-20 md:py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-accent/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-accent-foreground mb-2 sm:mb-4">
            Find Us
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-6 gradient-text">
            Location & Directions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm md:text-base px-2">
            Join us at our campus for an unforgettable experience
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 bg-card box-glow-accent">
            <div className="aspect-[4/3] sm:aspect-video w-full">
              <iframe
                src={embedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="College Location Map"
              />
            </div>

            <div className="p-4 sm:p-6 md:p-8 bg-card/80 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 box-glow-primary">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">Venue</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      MES M.K. Mackar Pillay College<br />
                      for Advanced Studies, Edathala
                    </p>
                  </div>
                </div>

                <Button
                  asChild
                  size="default"
                  className="gradient-primary text-primary-foreground font-semibold box-glow-primary hover:scale-[1.02] transition-transform duration-300 text-xs sm:text-sm h-9 sm:h-11 w-full sm:w-auto"
                >
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
