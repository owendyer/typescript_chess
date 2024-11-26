// import {useEffect, useState, useRef} from "react";
import {ChessSquareProps} from "@/components/ChessSquare";
import ChessBoard from "@/components/ChessBoard";

/*
TODO:
    - Add dynamic board size stuff with ResizeObserver
    - Set square sizes to be relative to the board size (12.5% I think)
    - Add drag and drop functionality for pieces (no libraries lol...)
*/


export default function Home() {
    const chessSquares: ChessSquareProps[] = Array.from({ length: 64 }, (_, index) => ({
        index: index,
        color: (index % 8 + Math.floor(index / 8)) % 2 === 0 ? "light" : "dark",
    }));
    // console.log(chessSquares);

    return (
        <div className="h-screen max-w-7xl mx-auto">
            <ChessBoard squares={chessSquares} />
        </div>
    );
}