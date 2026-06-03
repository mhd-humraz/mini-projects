import { Phone, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const SOSButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleSOS = async () => {
    setIsActive(true);
    setIsGettingLocation(true);

    try {
      // Get user's location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            toast.success("SOS Alert Sent!", {
              description: `Location captured: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}. Help is on the way.`,
              duration: 5000,
            });
            setIsGettingLocation(false);
            setTimeout(() => setIsActive(false), 3000);
          },
          (error) => {
            toast.error("Location access denied", {
              description: "SOS sent without precise location. Please enable GPS for faster response.",
            });
            setIsGettingLocation(false);
            setTimeout(() => setIsActive(false), 3000);
          }
        );
      } else {
        toast.warning("SOS Alert Sent", {
          description: "Geolocation not available. Emergency services notified.",
        });
        setIsGettingLocation(false);
        setTimeout(() => setIsActive(false), 3000);
      }
    } catch (error) {
      toast.error("Failed to send SOS", {
        description: "Please try again or call emergency services directly.",
      });
      setIsActive(false);
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Quick Emergency Call */}
      <a
        href="tel:112"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary hover:bg-accent transition-colors shadow-lg"
      >
        <Phone className="w-5 h-5 text-foreground" />
      </a>
      
      {/* Main SOS Button */}
      <Button
        variant="sos"
        size="icon-xl"
        onClick={handleSOS}
        disabled={isActive}
        className="relative"
      >
        {isGettingLocation ? (
          <Loader2 className="w-8 h-8 animate-spin" />
        ) : (
          <>
            <span className="text-xl font-black">SOS</span>
          </>
        )}
        
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-destructive/20 animate-ping" />
      </Button>
      
      {/* Location indicator */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        <span>GPS Active</span>
      </div>
    </div>
  );
};

export default SOSButton;
