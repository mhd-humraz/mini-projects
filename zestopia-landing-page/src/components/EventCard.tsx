import { Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface EventDetails {
  name: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  registrationLink: string;
  icon: string;
}

interface EventCardProps {
  event: EventDetails;
  index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay: `${0.08 * index}s` }}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          card-premium rounded-xl sm:rounded-2xl cursor-pointer overflow-hidden
          ${isExpanded ? 'border-primary/40 box-glow-primary' : ''}
        `}
      >
        {/* Card Header */}
        <div className="p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
            <div className={`
              w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl
              ${isExpanded ? 'gradient-primary box-glow-primary' : 'bg-muted/60'}
              transition-all duration-400
            `}>
              {event.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`
                font-display text-sm sm:text-base md:text-lg font-bold transition-colors duration-300 truncate
                ${isExpanded ? 'text-primary' : 'text-foreground'}
              `}>
                {event.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{event.date}</p>
            </div>
          </div>

          {!isExpanded && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}
        </div>

        {/* Expanded Details */}
        <div className={`
          grid transition-all duration-500 ease-out
          ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
        `}>
          <div className="overflow-hidden">
            <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 space-y-4 sm:space-y-5">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-muted/30">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Date</p>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-muted/30">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-muted/30">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Venue</p>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-muted/30">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">Team</p>
                    <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">{event.teamSize}</p>
                  </div>
                </div>
              </div>

              <Button
                asChild
                className="w-full gradient-primary text-primary-foreground font-semibold rounded-lg sm:rounded-xl h-9 sm:h-11 text-xs sm:text-sm box-glow-primary hover:scale-[1.02] transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register Now
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
