import { Shield, AlertTriangle, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-6 animate-slide-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            <span className="text-sm font-medium text-destructive">3 Active Emergencies</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-tight animate-slide-in-up" style={{ animationDelay: '100ms' }}>
            Stay Safe.
            <br />
            <span className="text-primary">Stay Informed.</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            Real-time disaster alerts, emergency response coordination, and community safety — all in one platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
            <Button variant="default" size="xl">
              <AlertTriangle className="w-5 h-5" />
              View Active Alerts
            </Button>
            <Button variant="outline" size="xl">
              <Radio className="w-5 h-5" />
              Enable Notifications
            </Button>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border animate-slide-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">156</span> emergencies resolved today
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">28</span> shelters ready
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warning" />
              <span className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">500+</span> volunteers active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
