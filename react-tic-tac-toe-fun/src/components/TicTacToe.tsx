import { useState, useCallback } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const TicTacToe = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = useCallback((squares: (string | null)[]) => {
    for (const [a, b, c] of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }
    return null;
  }, []);

  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line ?? null;
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleCellClick = (index: number) => {
    if (squares[index] || winner) return;

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
        Tic Tac Toe
      </h1>

      <GameStatus
        winner={winner}
        isDraw={isDraw}
        currentPlayer={isXNext ? "X" : "O"}
      />

      <Board
        squares={squares}
        onCellClick={handleCellClick}
        winningLine={winningLine}
        disabled={!!winner || isDraw}
      />

      <Button
        onClick={resetGame}
        variant="outline"
        size="lg"
        className="gap-2 mt-4"
      >
        <RotateCcw className="w-4 h-4" />
        New Game
      </Button>
    </div>
  );
};

export default TicTacToe;
