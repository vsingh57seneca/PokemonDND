import { selectedPokemonAtom } from "@/atoms/atoms";
import { useAtom } from "jotai";
import React from "react";
import PokemonHBBar from "./PokemonHBBar";

const PokemonWidget = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
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
                <img src={selectedPokemon.image} />
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
        </>
      )}
    </div>
  );
};

export default PokemonWidget;
