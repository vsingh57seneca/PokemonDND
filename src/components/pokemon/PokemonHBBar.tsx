import {
  characterTableAtom,
  selectedCharacterAtom,
  selectedPokemonAtom,
} from "@/atoms/atoms";
import { Character } from "@/classes/Character";
import { CharacterTable } from "@/classes/database/CharacterTable";
import { Pokemon } from "@/classes/Pokemon";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const PokemonHBBar = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);
  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );

  const hpPercentage =
    ((selectedPokemon?.current_hit_points as number) /
      selectedPokemon?.hit_points!) *
    100;

    const handleHPChange = (hp: string) => {

      console.log(Number(hp));
      if(Number(hp) < 0 || Number(hp) > selectedPokemon?.hit_points!) {
        return;
      }

      const updatedPokemon = { ...selectedPokemon, current_hit_points: Number(hp) }; // Update local Pokémon state
      setSelectedPokemon(updatedPokemon as Pokemon); // Update the atom for live reactivity
    
      const characterUpdated = characterTable?.updatePokemon(
        selectedCharacter?.id as string,
        selectedPokemon?.id as string,
        { current_hit_points: Number(hp) }
      );
    
      if (characterUpdated) {
        // Reinitialize the CharacterTable class with updated records
        const newCharacterTable = new CharacterTable(characterTable?.tableName);
        newCharacterTable.records = characterTable?.records as Character[]; // Retain the updated records
        setCharacterTable(newCharacterTable); // Set as the new instance
    
        // Update selectedCharacter in the atom
        setSelectedCharacter((prev) => {
          if (!prev) return undefined;
        
          // Map ownedPokemon to ensure all elements are instances of Pokemon
          const updatedOwnedPokemon = prev.ownedPokemon.map((pokemon) => {
            if (pokemon.id === updatedPokemon.id) {
              // Replace the updated Pokémon with a new instance
              return new Pokemon({
                ...pokemon, // Retain existing properties
                ...updatedPokemon, // Merge updates
              });
            }
        
            // Rehydrate plain objects into Pokemon instances
            return pokemon instanceof Pokemon ? pokemon : new Pokemon(pokemon);
          });
        
          // Create a new instance of Character to retain methods
          const updatedCharacter = new Character(prev.name, updatedOwnedPokemon);
          updatedCharacter.id = prev.id;
        
          return updatedCharacter;
        });
      }
    };

  return (
    <>
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
              onChange={(e) => {
                handleHPChange(e.target.value);
              }}
              value={selectedPokemon?.current_hit_points!}
              className="w-14 text-black bg-gray-500"
            ></input>
            /<p>{selectedPokemon?.hit_points}</p>
          </p>
        </div>
      )}
    </>
  );
};

export default PokemonHBBar;
