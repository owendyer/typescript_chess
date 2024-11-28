"use client";

import React, { useEffect, useRef, useState } from "react";
import ChessSquare from "@/components/ChessSquare";
import type {
  ChessBoardDimensions,
  ChessPieceProps,
  ChessSquareProps,
  // NumericChessBoardCoordinate,
  // ChessPieceMove,
} from "@/constants/types";

import ChessPiece from "@/components/ChessPiece";
import { createChessPiecesFromFen } from "@/utils/parseFenString";
import initializeChessSquares from "@/utils/initializeChessSquares";
import movePiece from "@/utils/movePiece";

export default function ChessBoard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<HTMLDivElement>(null);
  const [boardDimensions, setBoardDimensions] = useState<ChessBoardDimensions>({
    boardSideLength: 0,
    squareSideLength: 0,
    orientation: "light",
  });
  const [chessPieces, setChessPieces] = useState<ChessPieceProps[]>(
    [] as ChessPieceProps[],
  );
  const [draggedPiece, setDraggedPiece] = useState<ChessPieceProps | null>(
    null,
  );
  // const [moves, setMoves] = useState<ChessPieceMove[]>([] as ChessPieceMove[]);
  const chessSquares: ChessSquareProps[] = initializeChessSquares();

  useEffect(() => {
    setChessPieces(
      createChessPiecesFromFen(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      ),
    );
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const rect = entries[0].contentRect;
        if (rect.width < rect.height) {
          setBoardDimensions((prev) => ({
            ...prev,
            boardSideLength: rect.width,
            squareSideLength: rect.width / 8,
          }));
        } else {
          setBoardDimensions((prev) => ({
            ...prev,
            boardSideLength: rect.height,
            squareSideLength: rect.height / 8,
          }));
        }
      }
    });
    resizeObserver.observe(containerRef.current as Element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggedPiece && piecesRef.current) {
      const boardRect = piecesRef.current.getBoundingClientRect();
      let updatedXCoordinate: number = event.clientX;
      if (updatedXCoordinate < boardRect.left) {
        updatedXCoordinate = 0;
      } else if (updatedXCoordinate > boardRect.right) {
        updatedXCoordinate = boardRect.width;
      } else {
        updatedXCoordinate -= boardRect.left;
      }
      let updatedYCoordinate: number = event.clientY;
      if (updatedYCoordinate < boardRect.top) {
        updatedYCoordinate = 0;
      } else if (updatedYCoordinate > boardRect.bottom) {
        updatedYCoordinate = boardRect.height;
      } else {
        updatedYCoordinate -= boardRect.top;
      }
      setDraggedPiece({
        ...draggedPiece,
        rect: {
          top: updatedYCoordinate,
          left: updatedXCoordinate,
          isDragging: true,
        },
      });
    }
  };

  const handlePointerDown = (
    event: React.MouseEvent<HTMLDivElement>,
    piece: ChessPieceProps,
  ) => {
    event.preventDefault();
    if (piecesRef.current) {
      const boardRect = piecesRef.current.getBoundingClientRect();
      setDraggedPiece({
        ...piece,
        rect: {
          top: event.clientY - boardRect.top,
          left: event.clientX - boardRect.left,
          isDragging: true,
        },
        zIndex: 2,
      });
    }
  };

  const calculatePieceCoordinateFromCursorPosition = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (piecesRef.current) {
      const boardRect = piecesRef.current.getBoundingClientRect();
      const updatedRank = Math.floor(
        (event.clientY - boardRect.top) / boardDimensions.squareSideLength,
      );
      const updatedFile = Math.floor(
        (event.clientX - boardRect.left) / boardDimensions.squareSideLength,
      );

      if (
        updatedRank < 0 ||
        updatedFile < 0 ||
        updatedRank > 7 ||
        updatedFile > 7
      ) {
        return null;
      }

      return {
        rank: updatedRank,
        file: updatedFile,
      };
    }

    return null;
  };

  const handlePointerUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (piecesRef.current) {
      const boardRect = piecesRef.current.getBoundingClientRect();
      if (
        event.clientX < boardRect.left ||
        event.clientX > boardRect.right ||
        event.clientY < boardRect.top ||
        event.clientY > boardRect.bottom
      ) {
        console.log("drag released outside of board");
        setDraggedPiece(null);
        return;
      }
    }
    // if (draggedPiece) {
    //   const targetCoordinate =
    //     calculatePieceCoordinateFromCursorPosition(event);
    //
    //   if (!targetCoordinate) {
    //     setDraggedPiece(null);
    //     return;
    //   }
    //
    //   const newMove: ChessPieceMove = {
    //     to: targetCoordinate,
    //     isCapture: false,
    //   } as ChessPieceMove;
    //
    //   const updatedPieces: ChessPieceProps[] = chessPieces.filter((piece) => {
    //     if (
    //       piece.coordinate.rank === targetCoordinate.rank &&
    //       piece.coordinate.file === targetCoordinate.file
    //     ) {
    //       if (piece.pieceColor === draggedPiece.pieceColor) {
    //         throw new Error("Invalid move");
    //       }
    //       newMove.isCapture = true;
    //       return false;
    //     }
    //     return true;
    //   });
    //
    //   const movedPieceIndex: number = updatedPieces.findIndex(
    //     (piece) =>
    //       piece.coordinate.rank === draggedPiece.coordinate.rank &&
    //       piece.coordinate.file === draggedPiece.coordinate.file,
    //   );
    //
    //   if (movedPieceIndex === -1) {
    //     setDraggedPiece(null);
    //     return;
    //   }
    //
    //   const reupdatedPieces: ChessPieceProps[] = updatedPieces.map(
    //     (piece, index) => {
    //       if (index === movedPieceIndex) {
    //         newMove.from = piece.coordinate;
    //         return {
    //           ...piece,
    //           coordinate: targetCoordinate,
    //         };
    //       }
    //       return piece;
    //     },
    //   );
    //
    //   setMoves((prev) => [...prev, newMove]);
    //   setChessPieces(reupdatedPieces);
    // }

    if (draggedPiece) {
      const targetCoordinate =
        calculatePieceCoordinateFromCursorPosition(event);

      if (!targetCoordinate) {
        setDraggedPiece(null);
        return;
      }

      const updatedPieces: ChessPieceProps[] = movePiece(
        draggedPiece,
        targetCoordinate,
        chessPieces,
        chessSquares,
      );
      setChessPieces(updatedPieces);
    }
    setDraggedPiece(null);
  };

  const calculatePieceRectFromCoordinate = (
    piece: ChessPieceProps,
  ): ChessPieceProps => {
    if (
      draggedPiece &&
      piece.coordinate.file === draggedPiece.coordinate.file &&
      piece.coordinate.rank === draggedPiece.coordinate.rank
    ) {
      return draggedPiece as ChessPieceProps;
    }

    return {
      ...piece,
      rect: {
        top: boardDimensions.squareSideLength * piece.coordinate.rank,
        left: boardDimensions.squareSideLength * piece.coordinate.file,
        isDragging: false,
      },
    } as ChessPieceProps;
  };

  return (
    <div
      className="w-full h-full"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        ref={containerRef}
        className="w-full h-full flex justify-center items-center sm:p-4 md:p-8 -z-[1]"
      >
        <div
          className="chess-board grid grid-cols-8 z-0"
          style={{
            width: `${boardDimensions.boardSideLength}px`,
            height: `${boardDimensions.boardSideLength}px`,
          }}
        >
          {chessSquares.map((square, index) => (
            <ChessSquare key={index} {...square} />
          ))}
        </div>
        <div ref={piecesRef} className="absolute touch-none">
          <div
            className="relative"
            style={{
              width: `${boardDimensions.boardSideLength}px`,
              height: `${boardDimensions.boardSideLength}px`,
            }}
          >
            {chessPieces.map((piece) => {
              const updatedPiece: ChessPieceProps =
                calculatePieceRectFromCoordinate(piece);

              return (
                <ChessPiece
                  key={`${piece.pieceType}-${piece.pieceColor}-${piece.coordinate.rank}-${piece.coordinate.file}`}
                  piece={updatedPiece}
                  squareSideLength={boardDimensions.squareSideLength}
                  onPointerDown={(event: React.MouseEvent<HTMLDivElement>) =>
                    handlePointerDown(event, updatedPiece)
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
