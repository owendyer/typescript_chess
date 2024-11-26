"use client";

import {useEffect, useState, useRef} from "react";
import ChessSquare, {ChessSquareProps} from "@/components/ChessSquare";

export interface ChessBoardProps {
    squares: ChessSquareProps[];
}


export interface ChessBoardDimensions {
    width: number;
    height: number;
}


export default function ChessBoard({squares}: ChessBoardProps) {
    const boardRef = useRef<HTMLDivElement>(null);
    // const [width, setWidth] = useState<number>(0);
    const [dimensions, setDimensions] = useState<ChessBoardDimensions>({width: 0, height: 0});

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                const rect = entries[0].contentRect;
                if (rect.width < rect.height) {
                    setDimensions({
                        width: rect.width,
                        height: rect.width,
                    });
                }
                else {
                    setDimensions({width: rect.height, height: rect.height});
                }
                // setWidth(containerWidth);
                // console.log(rect);
            }
        });
        resizeObserver.observe(boardRef.current as Element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div ref={boardRef} className="w-full h-full flex justify-center items-center p-8">
            <div className="chess-board grid grid-cols-8 p-6 rounded-md" style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}>
                {squares.map((square, index) => (<ChessSquare key={index} color={square.color} index={index} />))}
            </div>
        </div>
    )
}