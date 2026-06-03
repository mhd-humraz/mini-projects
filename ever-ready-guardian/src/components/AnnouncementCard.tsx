import { Megaphone, Clock, BadgeCheck } from "lucide-react";

interface AnnouncementCardProps {
  id: string;
  title: string;
  content: string;
  source: string;
  time: string;
  isVerified?: boolean;
}

const AnnouncementCard = ({
  title,
  content,
  source,
  time,
  isVerified = true,
}: AnnouncementCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
          <Megaphone className="w-5 h-5 text-primary" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-primary">{source}</span>
            {isVerified && (
              <BadgeCheck className="w-4 h-4 text-primary" />
            )}
          </div>
          
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{content}</p>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
