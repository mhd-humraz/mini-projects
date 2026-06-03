import { Home, Users, Phone, MapPin, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ShelterCardProps {
  id: string;
  name: string;
  address: string;
  capacity: number;
  currentOccupancy: number;
  phone: string;
  hasFood: boolean;
  hasMedical: boolean;
  distance?: string;
}

const ShelterCard = ({
  name,
  address,
  capacity,
  currentOccupancy,
  phone,
  hasFood,
  hasMedical,
  distance,
}: ShelterCardProps) => {
  const occupancyPercentage = (currentOccupancy / capacity) * 100;
  const isNearCapacity = occupancyPercentage >= 80;
  const isFull = occupancyPercentage >= 100;

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Home className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{name}</h3>
            {distance && (
              <p className="text-xs text-muted-foreground">{distance} away</p>
            )}
          </div>
        </div>
        <span
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-full",
            isFull
              ? "bg-destructive/20 text-destructive"
              : isNearCapacity
              ? "bg-warning/20 text-warning"
              : "bg-success/20 text-success"
          )}
        >
          {isFull ? "Full" : isNearCapacity ? "Almost Full" : "Available"}
        </span>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
        <span>{address}</span>
      </div>

      {/* Capacity Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-muted-foreground flex items-center gap-1">
            <Users className="w-4 h-4" />
            Capacity
          </span>
          <span className="font-semibold text-foreground">
            {currentOccupancy} / {capacity}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              isFull
                ? "bg-destructive"
                : isNearCapacity
                ? "bg-warning"
                : "bg-success"
            )}
            style={{ width: `${Math.min(occupancyPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Resources */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          {hasFood ? (
            <CheckCircle className="w-4 h-4 text-success" />
          ) : (
            <XCircle className="w-4 h-4 text-destructive" />
          )}
          <span className={hasFood ? "text-foreground" : "text-muted-foreground"}>
            Food
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {hasMedical ? (
            <CheckCircle className="w-4 h-4 text-success" />
          ) : (
            <XCircle className="w-4 h-4 text-destructive" />
          )}
          <span className={hasMedical ? "text-foreground" : "text-muted-foreground"}>
            Medical
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1" asChild>
          <a href={`tel:${phone}`}>
            <Phone className="w-4 h-4" />
            Call
          </a>
        </Button>
        <Button variant="default" className="flex-1">
          <MapPin className="w-4 h-4" />
          Directions
        </Button>
      </div>
    </div>
  );
};

export default ShelterCard;
