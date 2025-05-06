import { selectedPokemonAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import PokemonHBBar from "./PokemonHBBar";
import Modal from "../Modal";
import { fetchAllMoves } from "@/functions/PokemonHelperFunctions";

const PokemonWidget = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedMove, setSelectedMove] = useState<string>();
  const [selectedMoveDetails, setSelectedMoveDetails] = useState<any>({});
  const [moveList, setMoveList] = useState<any>();

  useEffect(() => {
    const details = moveList?.find((move: any) => move.name === selectedMove);

    if (details) {
      setSelectedMoveDetails(details);
    }
  }, [selectedMove]);

  useEffect(() => {
    const fetchMoves = async () => {
      const moves = await fetchAllMoves();
      setMoveList(moves);
    };

    fetchMoves();

    console.log(selectedPokemon);
  }, [selectedPokemon]);

  return (
    <div>
      {selectedPokemon && (
        <>
          <div className="flex flex-col items-center gap-y-2">
            <div className="border-4 p-2 rounded-lg border-green-300">
              <p className="text-center">
                Level: {selectedPokemon.current_level}
              </p>
              <div className="relative">
                <img src={selectedPokemon.image} width={70} />
                {(selectedPokemon.current_hit_points as number) <= 0 && (
                  <div className="absolute top-[30%] left-[30%]">
                    <p className="text-5xl text-red-500">X</p>
                  </div>
                )}
              </div>
              <p className="text-center">
                {selectedPokemon.given_name || selectedPokemon.name}
              </p>
            </div>
            <PokemonHBBar />
          </div>

          <div className="h-28 overflow-y-auto md:h-full">
            {/* Abilities */}
            <div className="flex justify-between md:flex-col gap-6 my-6">
              {selectedPokemon.selected_ability && (
                <div className="flex justify-center">
                  <button
                    className="px-4 py-1 w-full rounded bg-orange-500 font-semibold hover:bg-orange-600"
                    onClick={() => setActiveModal("ability")}
                  >
                    Ability
                  </button>
                </div>
              )}
              {selectedPokemon.hidden_ability.length > 0 && (
                <div className="flex justify-center">
                  <button
                    className="px-4 py-1 w-full rounded bg-orange-500 font-semibold hover:bg-orange-600"
                    onClick={() => setActiveModal("hiddenAbility")}
                  >
                    Hidden Ability
                  </button>
                </div>
              )}
            </div>

            {/* Moves */}

            <div className="grid grid-cols-1 gap-6 my-6">
              {selectedPokemon.selected_moves?.map((move) => (
                <div className="col-span-1 md:col-span-1">
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
        </>
      )}
    </div>
  );
};

export default PokemonWidget;
