import ChessPiece from "@/components/ChessPiece";

export interface ChessSquareProps {
    index: number;
    color: "light" | "dark";
}

export default function ChessSquare({index, color}: ChessSquareProps) {
    return (
        <div className={`w-full h-full bg-${color}-square aspect-square flex justify-center items-center`}>
            <ChessPiece pieceType="pawn" pieceColor={color}/>
        </div>
    )
}