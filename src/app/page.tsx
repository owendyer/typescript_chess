import ChessBoard from "@/components/ChessBoard";

/*
TODO:
    - Add drag and drop functionality for pieces (no libraries lol...)
*/

export default function Home() {
  return (
    <div className="h-screen mx-auto">
      <ChessBoard />
    </div>
  );
}
