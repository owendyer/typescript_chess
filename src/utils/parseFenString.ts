import {
  ChessPieceRect,
  ChessPieceProps,
  NumericChessBoardCoordinate,
} from "@/constants/types";

export default function parseFenString(fenString: string): string[][] {
  const ranks = fenString.split(" ")[0].split("/");

  return ranks.map((rank) => {
    const pieces: string[] = [];
    for (const char of rank) {
      const emptySpaces = parseInt(char, 10);
      if (isNaN(emptySpaces)) {
        pieces.push(char);
      } else {
        pieces.push(...Array(emptySpaces).fill(" "));
      }
    }
    return pieces;
  });
}

export function createChessPiecesFromFen(fenString: string): ChessPieceProps[] {
  /*
  TODO: Make this not stupid...
  */
  const pieceSymbols: {
    [key: string]: {
      type: ChessPieceProps["pieceType"];
      color: ChessPieceProps["pieceColor"];
    };
  } = {
    p: { type: "pawn", color: "dark" },
    P: { type: "pawn", color: "light" },
    r: { type: "rook", color: "dark" },
    R: { type: "rook", color: "light" },
    n: { type: "knight", color: "dark" },
    N: { type: "knight", color: "light" },
    b: { type: "bishop", color: "dark" },
    B: { type: "bishop", color: "light" },
    q: { type: "queen", color: "dark" },
    Q: { type: "queen", color: "light" },
    k: { type: "king", color: "dark" },
    K: { type: "king", color: "light" },
  };

  const ranks = parseFenString(fenString);

  const chessPieces: ChessPieceProps[] = [];
  for (let rankIndex = 0; rankIndex < ranks.length; rankIndex++) {
    const rank = ranks[rankIndex];
    for (let fileIndex = 0; fileIndex < rank.length; fileIndex++) {
      const symbol = rank[fileIndex];
      if (symbol !== " ") {
        const pieceInfo = pieceSymbols[symbol];
        if (pieceInfo) {
          /* TODO: Make not hardcoded for light perspective*/
          // const coordinate: NumericChessBoardCoordinate = {
          //     rank: 7 - rankIndex, /* Coordinates are zero-indexed so 7 instead of 8 */
          //     file: fileIndex
          // }
          const coordinate: NumericChessBoardCoordinate = {
            rank: rankIndex /* Coordinates are zero-indexed so 7 instead of 8 */,
            file: fileIndex,
          };

          const rect: ChessPieceRect = {
            top: 0,
            left: 0,
            isDragging: false,
          };

          const piece: ChessPieceProps = {
            pieceType: pieceInfo.type,
            pieceColor: pieceInfo.color,
            coordinate,
            rect,
            zIndex: 1,
          };

          chessPieces.push(piece);
        }
      }
    }
  }

  return chessPieces;
}
