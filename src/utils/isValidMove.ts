import {
  ChessPieceProps,
  ChessSquareProps,
  NumericChessBoardCoordinate,
} from "@/constants/types";

export default function isValidMove(
  piece: ChessPieceProps,
  target: NumericChessBoardCoordinate,
  pieces: ChessPieceProps[],
  chessBoard: ChessSquareProps[],
): boolean {
  const { rank, file } = piece.coordinate;
  const targetRank = target.rank;
  const targetFile = target.file;

  const isWithinBounds =
    targetRank >= 0 && targetRank < 8 && targetFile >= 0 && targetFile < 8;

  if (!chessBoard) {
    return false;
  }

  if (!isWithinBounds) {
    console.log("Move is out of bounds");
    return false;
  }

  const targetPiece = pieces.find(
    (p) => p.coordinate.rank === targetRank && p.coordinate.file === targetFile,
  );

  if (targetPiece && targetPiece.pieceColor === piece.pieceColor) {
    console.log("Cannot capture a piece of the same color");
    return false;
  }

  switch (piece.pieceType) {
    case "pawn":
      const direction = piece.pieceColor === "light" ? -1 : 1;
      const startingRank = piece.pieceColor === "light" ? 6 : 1;
      return (
        targetFile === file &&
        (targetRank === rank + direction ||
          (rank === startingRank && targetRank === rank + 2 * direction))
      );
    case "knight":
      return (
        (Math.abs(rank - targetRank) === 2 &&
          Math.abs(file - targetFile) === 1) ||
        (Math.abs(rank - targetRank) === 1 && Math.abs(file - targetFile) === 2)
      );
    case "bishop":
      return Math.abs(rank - targetRank) === Math.abs(file - targetFile);
    case "rook":
      return rank === targetRank || file === targetFile;
    case "queen":
      return (
        rank === targetRank ||
        file === targetFile ||
        Math.abs(rank - targetRank) === Math.abs(file - targetFile)
      );
    case "king":
      return (
        Math.abs(rank - targetRank) <= 1 && Math.abs(file - targetFile) <= 1
      );
    default:
      return false;
  }
}
