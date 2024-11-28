export interface NumericChessBoardCoordinate {
  rank: number;
  file: number;
}

export interface ChessSquareProps {
  coordinate: NumericChessBoardCoordinate;
  color: "light" | "dark";
}

export interface ChessPieceRect {
  top: number;
  left: number;
  isDragging: boolean;
}

export interface ChessPieceProps {
  pieceType: "bishop" | "king" | "knight" | "pawn" | "queen" | "rook";
  pieceColor: "light" | "dark";
  coordinate: NumericChessBoardCoordinate;
  rect: ChessPieceRect;
  zIndex: number;
}

export interface ChessBoardDimensions {
  boardSideLength: number;
  squareSideLength: number;
  orientation: "light" | "dark";
}

export interface ChessPieceMove {
  from: NumericChessBoardCoordinate;
  to: NumericChessBoardCoordinate;
  isCapture: boolean;
}
