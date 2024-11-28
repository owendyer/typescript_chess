import { ChessSquareProps } from "@/constants/types";

export default function initializeChessSquares() {
  const chessSquares: ChessSquareProps[] = [];

  for (let rank = 0; rank < 8; ++rank) {
    for (let file = 0; file < 8; ++file) {
      chessSquares.push({
        color: (rank + file) % 2 === 0 ? "light" : "dark",
        coordinate: {
          rank,
          file,
        },
      });
    }
  }

  return chessSquares;
}
