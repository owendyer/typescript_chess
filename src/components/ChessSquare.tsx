import type { ChessSquareProps } from "@/constants/types";
// import numericToAlgebraic from "@/utils/numericToAlgebraicCoordinate";

export default function ChessSquare(props: ChessSquareProps) {
  const { color } = props;
  // const algebraicCoordinate: string = numericToAlgebraic(coordinate);
  return (
    <div
      className={`w-full h-full bg-${color}-square aspect-square flex justify-center items-center`}
    >
      {/*{algebraicCoordinate}*/}
    </div>
  );
}
