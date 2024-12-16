import { Character } from "@/classes/Character";
import { Pokemon } from "@/classes/Pokemon";
import { updatePokemonInSelectedCharacter } from "@/functions/PokemonHelperFunctions";
import React, { ChangeEvent } from "react";

interface PokemonHPBarProps {
  selectedPokemon: Pokemon;
  selectedCharacter: Character;
  setSelectedCharacter: (selectedCharacter: Character) => void;
}

const PokemonHBBar: React.FC<PokemonHPBarProps> = ({ selectedPokemon, selectedCharacter, setSelectedCharacter }) => {
  const hpPercentage =
    selectedPokemon &&
    (selectedPokemon.current_hit_points! / selectedPokemon.hit_points) * 100;

    const onHpChange = (event: ChangeEvent<HTMLInputElement>) => {
      updatePokemonInSelectedCharacter(selectedPokemon.id!, {
        current_hit_points: Number(event.target.value)
      });

      selectedPokemon.updateHP(event.target.value);
          let updateCharacter = new Character(selectedCharacter?.name!, selectedCharacter?.pokemon);
          console.log(updateCharacter);
          if(updateCharacter) {
            setSelectedCharacter(updateCharacter);
          }
    }

  return (
    <div className="flex justify-center w-full">
      {selectedPokemon && (
        <div className="p-2 flex flex-col gap-y-2">
          <div className="h-4 bg-gray-700 rounded-box ">
            <div
              className={`h-full rounded-box ${
                hpPercentage > 50
                  ? "bg-green-500"
                  : hpPercentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${hpPercentage}%` }}
            ></div>
          </div>
          <p className="flex gap-x-2">
            <h1>HP: </h1>
            <input
              type="number"
              value={selectedPokemon?.current_hit_points!}
              onChange={onHpChange}
              className="w-14 text-black bg-gray-500"
            ></input>
            /<p>{selectedPokemon?.hit_points}</p>
          </p>
        </div>
      )}
    </div>
  );
};

export default PokemonHBBar;
