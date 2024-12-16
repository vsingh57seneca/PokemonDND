import React, { useEffect } from "react";

interface MoveListViewProps {
  knownMoves: any;
  selectedMoves: string[];
  setSelectedMoves: (selectedMoves: string[]) => void;
  level: number;
}

const MoveListView: React.FC<MoveListViewProps> = ({
  knownMoves,
  selectedMoves,
  setSelectedMoves,
  level,
}) => {
  const addMove = (move: string) => {
    if (!(selectedMoves.length < 4)) {
      alert("Only 4 moves max allowed");
      return;
    }

    if (!selectedMoves.includes(move)) {
      setSelectedMoves([...selectedMoves, move]);
    }

    console.log(selectedMoves);
  };

  const removeMove = (move: string) => {
    if (selectedMoves.includes(move)) {
      setSelectedMoves(selectedMoves.filter((m) => m !== move));
    }

    console.log(selectedMoves);
  };

  return (
    <>
      <div className="flex gap-x-4">
        {/* Available Moves */}
        <div className="flex flex-col">
          <h1 className="font-bold">Available Moves</h1>
          <div className="border max-h-[148px] overflow-y-auto p-2">
            {Object.entries(knownMoves)
              .filter(
                ([key]) =>
                  key === "starting_moves" ||
                  (key !== "starting_moves" && Number(key) <= level)
              )
              .map(([key, value]) => (
                <div key={key}>
                  {(value as string[])
                    .filter((move) => !selectedMoves.includes(move)) // Exclude selected moves
                    .map((move, index) => (
                      <p
                        className="cursor-pointer hover:bg-green-500 hover:text-white rounded px-2 py-1"
                        key={index}
                        onClick={() => addMove(move)}
                      >
                        {move}
                      </p>
                    ))}
                </div>
              ))}
          </div>
        </div>

        {/* Selected Moves */}
        <div className="flex flex-col">
          <h1 className="font-bold">Selected Moves</h1>
          <div className="border max-h-[148px] overflow-y-auto p-2">
            {selectedMoves.map((move) => (
              <p
                className="cursor-pointer hover:bg-red-500 hover:text-white rounded px-2 py-1"
                onClick={() => removeMove(move)}
              >
                {move}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoveListView;
