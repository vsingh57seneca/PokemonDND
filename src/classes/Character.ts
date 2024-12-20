import toast from "react-hot-toast";
import { Pokemon } from "./Pokemon";
import { v4 as uuidv4 } from "uuid";

export class Character {
  id: string;
  name: string;
  ownedPokemon: Pokemon[] = [];

  constructor(name: string, pokemon: Pokemon[] = []) {
    this.id = uuidv4(); // Automatically generate a unique ID for each Character
    this.name = name;
    this.ownedPokemon = pokemon;
  }

  updatePokemon(id: string, updatedRecord: Partial<Pokemon>): boolean {
    // Find the index of the Pokémon to update
    const recordIndex = this.ownedPokemon.findIndex(
      (pokemon) => pokemon.id === id
    );

    if (recordIndex === -1) {
      // Handle the case where the Pokémon is not found
      toast.error(`Pokemon with id ${id} not found.`);
      return false;
    }

    // Merge the existing Pokémon data with the updated data
    const existingPokemon = this.ownedPokemon[recordIndex];
    const updatedPokemon = {
      ...existingPokemon,
      ...updatedRecord,
    };

    // Update the Pokémon in the array
    this.ownedPokemon[recordIndex] = updatedPokemon as Pokemon;

    // Optionally provide feedback to the user
    toast.success(`Pokemon ${existingPokemon.name} updated successfully.`);
    return true;
  }
}
