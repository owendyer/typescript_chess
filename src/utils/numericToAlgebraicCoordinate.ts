import {NumericChessBoardCoordinate} from "@/constants/types";


export default function numericToAlgebraic(numeric: NumericChessBoardCoordinate): string {
    const file = String.fromCharCode('a'.charCodeAt(0) + numeric.file);
    const rank = 8 - numeric.rank;
    return `${file}${rank}`;
}
