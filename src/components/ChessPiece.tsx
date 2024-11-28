import { ChessPieceProps } from "@/constants/types";

import Queen from "@/assets/chess-pieces/queen.svg";
import King from "@/assets/chess-pieces/king.svg";
import Bishop from "@/assets/chess-pieces/bishop.svg";
import Knight from "@/assets/chess-pieces/knight.svg";
import Rook from "@/assets/chess-pieces/rook.svg";
import Pawn from "@/assets/chess-pieces/pawn.svg";
import React from "react";

const pieceMap = {
  queen: Queen,
  king: King,
  bishop: Bishop,
  knight: Knight,
  rook: Rook,
  pawn: Pawn,
};

export interface PieceProps {
  piece: ChessPieceProps;
  squareSideLength: number;
  onPointerDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function ChessPiece({
  piece,
  squareSideLength,
  onPointerDown,
}: PieceProps) {
  const { pieceColor, pieceType, rect, zIndex } = piece;
  const Piece = pieceMap[pieceType];
  return (
    <div
      className="absolute flex justify-center items-center"
      style={{
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        width: `${squareSideLength}px`,
        height: `${squareSideLength}px`,
        transform: piece.rect.isDragging ? "translate(-50%, -50%)" : "",
        zIndex: zIndex,
      }}
      onPointerDown={onPointerDown}
    >
      <Piece
        className={`w-3/4 h-3/4 fill-${pieceColor}-piece stroke-[8] stroke-black`}
      />
    </div>
  );
}
