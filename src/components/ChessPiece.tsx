import Queen from '@/assets/chess-pieces/queen.svg';
import King from '@/assets/chess-pieces/king.svg';
import Bishop from '@/assets/chess-pieces/bishop.svg';
import Knight from '@/assets/chess-pieces/knight.svg';
import Rook from '@/assets/chess-pieces/rook.svg';
import Pawn from '@/assets/chess-pieces/pawn.svg';

const pieceMap = {
    queen: Queen,
    king: King,
    bishop: Bishop,
    knight: Knight,
    rook: Rook,
    pawn: Pawn,
};


export interface ChessPieceProps {
    pieceType: "bishop" | "king" | "knight" | "pawn" | "queen" | "rook";
    pieceColor: "light" | "dark";
}

export default function ChessPiece({pieceType, pieceColor}: ChessPieceProps) {
    const Piece = pieceMap[pieceType];
    return (
        <div className="w-3/4 aspect-square">
            <Piece className={`w-full h-full fill-${pieceColor}-piece stroke-[8] stroke-black`} />
        </div>
    )
}