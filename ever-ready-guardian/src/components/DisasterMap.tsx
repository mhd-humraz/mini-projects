import { MapPin, ZoomIn, ZoomOut, Layers, AlertTriangle, Home, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DisasterMap = () => {
  return (
    <div className="relative w-full h-[500px] bg-secondary/50 rounded-2xl overflow-hidden border border-border">
      {/* Map placeholder with visual representation */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Simulated affected zones */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-destructive/20 border-2 border-destructive/40 animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-warning/20 border-2 border-warning/40" />
        <div className="absolute bottom-1/3 left-1/4 w-20 h-20 rounded-full bg-success/20 border-2 border-success/40" />
        
        {/* Markers */}
        <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <AlertTriangle className="w-8 h-8 text-destructive drop-shadow-lg" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-destructive whitespace-nowrap">
              Flood Zone
            </span>
          </div>
        </div>
        
        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Home className="w-6 h-6 text-success drop-shadow-lg" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-success whitespace-nowrap">
              Shelter
            </span>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-1/3 transform translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <Building2 className="w-6 h-6 text-primary drop-shadow-lg" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-primary whitespace-nowrap">
              Hospital
            </span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="secondary" size="icon" className="bg-card/80 backdrop-blur-sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-card/80 backdrop-blur-sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-card/80 backdrop-blur-sm">
          <Layers className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Map Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-destructive/30 border border-destructive" />
            <span className="text-muted-foreground">Critical Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-warning/30 border border-warning" />
            <span className="text-muted-foreground">Warning Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-success/30 border border-success" />
            <span className="text-muted-foreground">Safe Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-success" />
            <span className="text-muted-foreground">Shelter</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Hospital</span>
          </div>
        </div>
      </div>

      {/* Current location button */}
      <Button
        variant="default"
        size="sm"
        className="absolute bottom-4 right-4"
      >
        <MapPin className="w-4 h-4" />
        My Location
      </Button>
    </div>
  );
};

export default DisasterMap;
