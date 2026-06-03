import { AlertTriangle, CloudRain, Flame, Mountain, Wind, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type DisasterType = "flood" | "cyclone" | "fire" | "landslide" | "earthquake";

interface AlertCardProps {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: DisasterType;
  location: string;
  time: string;
  isNew?: boolean;
}

const severityConfig = {
  low: {
    bg: "bg-success/10 border-success/30",
    badge: "bg-success text-success-foreground",
    label: "Low",
  },
  medium: {
    bg: "bg-warning/10 border-warning/30",
    badge: "bg-warning text-warning-foreground",
    label: "Medium",
  },
  high: {
    bg: "bg-destructive/10 border-destructive/30",
    badge: "bg-destructive text-destructive-foreground",
    label: "High",
  },
  critical: {
    bg: "bg-critical/20 border-critical/50 animate-pulse-slow",
    badge: "bg-critical text-critical-foreground animate-alert-flash",
    label: "Critical",
  },
};

const typeIcons = {
  flood: CloudRain,
  cyclone: Wind,
  fire: Flame,
  landslide: Mountain,
  earthquake: AlertTriangle,
};

const AlertCard = ({
  title,
  description,
  severity,
  type,
  location,
  time,
  isNew,
}: AlertCardProps) => {
  const config = severityConfig[severity];
  const Icon = typeIcons[type];

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]",
        config.bg
      )}
    >
      {isNew && (
        <span className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
          NEW
        </span>
      )}
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={cn("p-3 rounded-xl", config.badge)}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("px-2 py-0.5 text-xs font-bold rounded-full", config.badge)}>
              {config.label}
            </span>
            <span className="text-xs text-muted-foreground capitalize">{type}</span>
          </div>
          
          <h3 className="text-lg font-bold text-foreground mb-1 truncate">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {time}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
