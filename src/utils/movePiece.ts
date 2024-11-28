import {
  ChessPieceProps,
  ChessSquareProps,
  NumericChessBoardCoordinate,
} from "@/constants/types";
import isValidMove from "@/utils/isValidMove";

export default function movePiece(
  piece: ChessPieceProps,
  target: NumericChessBoardCoordinate,
  pieces: ChessPieceProps[],
  chessBoard: ChessSquareProps[],
): ChessPieceProps[] {
  if (!isValidMove(piece, target, pieces, chessBoard)) {
    console.log("Invalid move");
    return pieces;
  }

  const updatedPieces = pieces.filter(
    (p) =>
      !(p.coordinate.rank === target.rank && p.coordinate.file === target.file),
  );

  const updatedPiece: ChessPieceProps = {
    ...piece,
    coordinate: target,
    zIndex: 1,
  };

  return updatedPieces.map((p) =>
    p.coordinate.rank === piece.coordinate.rank &&
    p.coordinate.file === piece.coordinate.file
      ? updatedPiece
      : p,
  );
}
