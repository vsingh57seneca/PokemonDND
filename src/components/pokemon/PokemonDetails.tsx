import { selectedPokemonAtom } from "@/atoms/atoms";
import { fetchAllMoves } from "@/functions/PokemonHelperFunctions";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const PokemonDetails = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  const [moveList, setMoveList] = useState<any>();
  const [selectedMove, setSelectedMove] = useState<string>();
  const [showMove, setShowMove] = useState<boolean>(false);
  const [moveDetails, setMoveDetails] = useState<any>();

  useEffect(() => {
    const fetchMoves = async () => {
      const moves = await fetchAllMoves();
      setMoveList(moves);
    };

    fetchMoves();
  }, []);

  useEffect(() => {
    const details = moveList?.find((move: any) => move.name === selectedMove);

    if (details) {
      setMoveDetails(details);
    }
  }, [selectedMove]);

  return (
    <>
      {selectedPokemon ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 p-4">
          <div className="col-span-1 flex flex-col">
            <h1 className="font-bold">Types:</h1>
            <p>{selectedPokemon.type.join(" ")}</p>
          </div>
          <div className="col-span-1 flex flex-col items-center">
            <h1 className="font-bold">SR:</h1>
            <p>{selectedPokemon.sr}</p>
          </div>
          <div className="col-span-1 flex flex-col">
            <h1 className="font-bold">Speed:</h1>
            <p>{selectedPokemon.speed.join(", ")}</p>
          </div>

          <div className="col-span-1 flex flex-col">
            <div className="flex gap-x-0.5 justify-start">
              <h1 className="font-bold">Armor Class:</h1>
              <p>{selectedPokemon.armor_class}</p>
            </div>
            <div className="flex gap-x-0.5 justify-start">
              <h1 className="font-bold">Prof Bonus:</h1>
              <p>{selectedPokemon.proficiency_bonus}</p>
            </div>
            <div className="flex gap-x-0.5 justify-start">
              <h1 className="font-bold">STAB Bonus:</h1>
              <p>{selectedPokemon.stab}</p>
            </div>
            <div className="flex gap-x-0.5 justify-start">
              <h1 className="font-bold">Hit Dice:</h1>
              <p>{selectedPokemon.hit_dice}</p>
            </div>
          </div>

          <div className="col-span-3 md:col-span-2 flex justify-center w-full items-center gap-x-4">
            {Object.entries(selectedPokemon.stats).map(([key, value]) => (
              <div className="flex flex-col items-center text-sm md:text-base">
                <h1 className="font-bold">{key.toUpperCase()}</h1>
                <div className="flex">
                  <p>{value.value}</p>
                  <p>{value.modifier}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-1 flex flex-col">
            <h1 className="font-bold">Proficient Skills:</h1>
            <p>{selectedPokemon.proficient_skills.join(", ")}</p>
          </div>

          <div className="col-span-2 flex flex-col items-c">
            <h1 className="font-bold">Vulnerabilities:</h1>
            <p>{selectedPokemon.vulnerabilities.join(", ")}</p>
          </div>

          <div className="col-span-1 flex flex-col">
            <h1 className="font-bold">Saving Throws:</h1>
            <p>{selectedPokemon.saving_throws.join(", ")}</p>
          </div>

          <div className="col-span-2 flex flex-col">
            <h1 className="font-bold">Resistances:</h1>
            <p>{selectedPokemon.resistances.join(", ")}</p>
          </div>

          <div className="col-span-3 flex flex-col">
            <h1 className="font-bold">Ability:</h1>
            <p>{selectedPokemon.selected_ability}</p>
          </div>

          {selectedPokemon.hidden_ability && (
            <div className="col-span-3 flex flex-col">
              <h1 className="font-bold">Hidden Ability:</h1>
              <p>{selectedPokemon.hidden_ability}</p>
            </div>
          )}

          <div className="col-span-3">
            <div className="grid grid-cols-4 gap-2">
              {selectedPokemon.selected_moves?.map((move) => (
                <button
                  className="font-bold md:px-4 md:py-2 bg-purple-500 rounded cursor-pointer hover:bg-purple-600"
                  onClick={() => {
                    setSelectedMove(move);
                    setShowMove(!showMove);
                  }}
                >
                  <h1>{move}</h1>
                  <p className="absolute bottom-full left-0 bg-white"></p>
                </button>
              ))}
            </div>
          </div>

          {selectedMove && moveDetails && (
            <>
              <div className="col-span-1">
                <h1>{moveDetails.name}</h1>
              </div>
              <div className="col-span-2">
                <p>Move Time: {moveDetails.move_time}</p>
              </div>

              <div className="col-span-1">
                <h1>Type: {moveDetails.type}</h1>
              </div>
              <div className="col-span-2">
                <p>Move Power: {moveDetails.move_power}</p>
              </div>
              <div className="col-span-1">
                <h1>Range: {moveDetails.range}</h1>
              </div>
              <div className="col-span-1">
                <h1>
                  PP: {moveDetails.current_pp}/{moveDetails.pp}
                </h1>
              </div>
              <div className="col-span-2">
                <h1>Duration: {moveDetails.duration}</h1>
              </div>

              <div className="col-span-3">
                <h1>Description: {moveDetails.description}</h1>
              </div>

              {moveDetails.higher_levels && (
                <div className="col-span-3">
                  <h1>Higher Levels: {moveDetails.higher_levels}</h1>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p className="w-full flex justify-center items-center h-full">
          Select A Pokemon
        </p>
      )}
    </>
  );
};

export default PokemonDetails;
