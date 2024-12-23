import { selectedPokemonAtom } from "@/atoms/atoms";
import { fetchAllMoves } from "@/functions/PokemonHelperFunctions";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";

const PokemonDetails = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  const [moveList, setMoveList] = useState<any>();
  const [selectedMove, setSelectedMove] = useState<string>();
  const [selectedMoveDetails, setSelectedMoveDetails] = useState<any>({});
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
      setSelectedMoveDetails(details);
    }
  }, [selectedMove]);

  return (
    <>
      {selectedPokemon ? (
        <div className="gap-y-4 flex flex-col overflow-y-auto max-h-64 md:max-h-full">
          <div className="grid grid-cols-3 gap-y-4">
            <div className="col-span-2 md:col-span-1">
              <div className="flex flex-col">
                <h1 className="font-bold">Types</h1>
                <p>{selectedPokemon.type.join(", ")}</p>
              </div>
            </div>

            <div className="col-span-1">
              <h1>Level | SR:</h1>
              <p>
                {selectedPokemon.current_level} | {selectedPokemon.sr}
              </p>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h1>Speeds:</h1>
              <p>{selectedPokemon.speed.join(", ")}</p>
            </div>

            <div className="col-span-1">
              <h1>Saving Throws:</h1>
              <p>{selectedPokemon.saving_throws.join(", ")}</p>
            </div>

            <div className="col-span-3 md:col-span-2 w-full flex justify-center gap-x-2">
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
          </div>

          <div className="grid grid-cols-4 gap-y-4">
            <div className="flex col-span1 flex-col">
              <h1 className="font-bold">Armor Class:</h1>
              <p>{selectedPokemon.armor_class}</p>
            </div>
            <div className="flex col-span1 flex-col">
              <h1 className="font-bold">Prof Bonus:</h1>
              <p>{selectedPokemon.proficiency_bonus}</p>
            </div>
            <div className="flex col-span1 flex-col">
              <h1 className="font-bold">STAB Bonus:</h1>
              <p>{selectedPokemon.stab}</p>
            </div>
            <div className="flex col-span1 flex-col">
              <h1 className="font-bold">Hit Dice:</h1>
              <p>{selectedPokemon.hit_dice}</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col">
              <h1 className="font-bold">Proficient Skills:</h1>
              <p>{selectedPokemon.proficient_skills.join(", ")}</p>
            </div>
            <div className="col-span-2 md:col-span-1 flex flex-col">
              <h1 className="font-bold">Vulnerabilities:</h1>
              <p>{selectedPokemon.vulnerabilities.join(", ")}</p>
            </div>
            <div className="col-span-4 md:col-span-2 flex flex-col">
              <h1 className="font-bold">Resistances:</h1>
              <p>{selectedPokemon.resistances.join(", ")}</p>
            </div>
          </div>

          {/* Abilities */}
          {selectedPokemon.selected_ability && (
            <div className="flex justify-center">
              <button
                className="px-4 py-1 w-full md:w-1/2 rounded bg-orange-500 font-semibold hover:bg-orange-600"
                onClick={() => setActiveModal("ability")}
              >
                Ability
              </button>
            </div>
          )}
          {selectedPokemon.hidden_ability && (
            <div className="flex justify-center">
              <button
                className="px-4 py-1 w-full md:w-1/2 rounded bg-orange-500 font-semibold hover:bg-orange-600"
                onClick={() => setActiveModal("hiddenAbility")}
              >
                Hidden Ability
              </button>
            </div>
          )}

          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {selectedPokemon.selected_moves?.map((move) => (
              <div className="col-span-4 md:col-span-1">
                <button
                  className="font-bold px-4 py-2 bg-purple-500 rounded cursor-pointer hover:bg-purple-600 w-full"
                  onClick={() => {
                    setSelectedMove(move);
                    setActiveModal("moveDetails");
                  }}
                >
                  <h1>{move}</h1>
                </button>
              </div>
            ))}
          </div>

          {activeModal === "ability" && (
            <Modal
              showModal={!!activeModal}
              setShowModal={() => setActiveModal(null)}
              modal_id="show_ability"
              modalTitle={selectedPokemon?.selected_ability!.split(": ")[0]}
            >
              {selectedPokemon?.selected_ability!.split(": ")[1]}
            </Modal>
          )}

          {activeModal === "hiddenAbility" && (
            <Modal
              showModal={!!activeModal}
              setShowModal={() => setActiveModal(null)}
              modal_id="show_h_ability"
              modalTitle={selectedPokemon.hidden_ability.split(": ")[0]}
            >
              {selectedPokemon.hidden_ability.split(": ")[1]}
            </Modal>
          )}

          {activeModal === "moveDetails" && (
            <Modal
              showModal={!!activeModal}
              setShowModal={() => setActiveModal(null)}
              modal_id="move_details"
              modalTitle={selectedMove as string}
            >
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">Range</h1>
                  <p>{selectedMoveDetails.range}</p>
                </div>

                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">PP</h1>
                  <p>
                    {selectedMoveDetails.current_pp}/{selectedMoveDetails.pp}
                  </p>
                </div>

                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">Type</h1>
                  <p>{selectedMoveDetails.type}</p>
                </div>

                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">Duration</h1>
                  <p>{selectedMoveDetails.duration}</p>
                </div>

                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">Move Time</h1>
                  <p>{selectedMoveDetails.move_time}</p>
                </div>

                <div className="col-span-1 flex flex-col">
                  <h1 className="font-bold">Move Power</h1>
                  <p>{selectedMoveDetails.move_power}</p>
                </div>

                <div className="col-span-2 flex flex-col">
                  <h1 className="font-bold">Description</h1>
                  <p>{selectedMoveDetails.description}</p>
                </div>
                {selectedMoveDetails.higher_levels && (
                  <div className="col-span-2 flex flex-col">
                    <h1 className="font-bold">Higher Level</h1>
                    <p>{selectedMoveDetails.higher_levels}</p>
                  </div>
                )}
              </div>
            </Modal>
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
