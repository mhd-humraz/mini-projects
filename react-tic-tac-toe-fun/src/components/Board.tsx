import Cell from "./Cell";

interface BoardProps {
  squares: (string | null)[];
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
}

const Board = ({ squares, onCellClick, winningLine, disabled }: BoardProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs md:max-w-sm">
      {squares.map((value, index) => (
        <Cell
          key={index}
          value={value as "X" | "O" | null}
          onClick={() => onCellClick(index)}
          isWinning={winningLine?.includes(index) ?? false}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Board;
