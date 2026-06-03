import { AlertTriangle, Users, Home, CheckCircle } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  trend?: "up" | "down" | "stable";
  variant?: "default" | "warning" | "success" | "destructive";
}

const StatItem = ({ icon, value, label, variant = "default" }: StatItemProps) => {
  const variants = {
    default: "bg-primary/10 text-primary",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border">
      <div className={`p-2.5 rounded-lg ${variants[variant]}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

const StatsBar = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatItem
        icon={<AlertTriangle className="w-5 h-5" />}
        value={12}
        label="Active Alerts"
        variant="destructive"
      />
      <StatItem
        icon={<Users className="w-5 h-5" />}
        value="2,450"
        label="People Affected"
        variant="warning"
      />
      <StatItem
        icon={<Home className="w-5 h-5" />}
        value={28}
        label="Shelters Open"
        variant="success"
      />
      <StatItem
        icon={<CheckCircle className="w-5 h-5" />}
        value={156}
        label="SOS Resolved Today"
        variant="success"
      />
    </div>
  );
};

export default StatsBar;
