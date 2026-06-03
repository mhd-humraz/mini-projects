import { cn } from "@/lib/utils";

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  currentPlayer: "X" | "O";
}

const GameStatus = ({ winner, isDraw, currentPlayer }: GameStatusProps) => {
  if (winner) {
    return (
      <div className="text-center animate-bounce-subtle">
        <p className="text-2xl md:text-3xl font-bold">
          Player{" "}
          <span className={cn(winner === "X" ? "text-x" : "text-o")}>
            {winner}
          </span>{" "}
          wins!
        </p>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="text-center">
        <p className="text-2xl md:text-3xl font-bold text-muted-foreground">
          It's a draw!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xl md:text-2xl text-muted-foreground">
        Player{" "}
        <span
          className={cn(
            "font-bold transition-colors",
            currentPlayer === "X" ? "text-x" : "text-o"
          )}
        >
          {currentPlayer}
        </span>
        's turn
      </p>
    </div>
  );
};

export default GameStatus;
