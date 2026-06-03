import { cn } from "@/lib/utils";

interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

const Cell = ({ value, onClick, isWinning, disabled }: CellProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={cn(
        "aspect-square w-full rounded-xl bg-cell transition-all duration-200",
        "flex items-center justify-center text-5xl md:text-6xl font-bold",
        "hover:bg-cell-hover hover:scale-[1.02] active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:hover:scale-100",
        "border-2 border-border",
        isWinning && "animate-pulse-glow border-primary"
      )}
    >
      {value && (
        <span
          className={cn(
            "animate-pop-in",
            value === "X" ? "text-x" : "text-o"
          )}
        >
          {value}
        </span>
      )}
    </button>
  );
};

export default Cell;
