import { Pokemon } from "@/classes/Pokemon";
import { v4 as uuidv4 } from "uuid";

// Converts all pokemon into Pokemon objects and returns Pokemon[]
export const convertToPokemonObjects = async () => {
  try {
    const response = await fetch("/data/pokemon_master_list.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const json_pokemon_list = await response.json();
    const fetched_pokemon = json_pokemon_list;

    // Map fetched data into Pokemon instances
    const newPokemonList = fetched_pokemon.map(
      (pokemon: any) => new Pokemon(pokemon)
    );
    return newPokemonList;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
};
export const fetchAllMoves = async () => {
  try {
    const response = await fetch("/data/move_list.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const json_moves_list = await response.json();
    const fetched_moves = json_moves_list;

    return fetched_moves;
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
  }
};

export const generatePokemon = (
  selectedPokemon: Pokemon,
  pokemonInput: {
    givenName: string;
    desiredLevel: number;
    selectedMoves: string[];
    selectedAbility: string | undefined;
  }
): Pokemon | null => {
  try {
    const newPokemon = new Pokemon(selectedPokemon);
    newPokemon.id = uuidv4();
    newPokemon.given_name = pokemonInput.givenName;
    newPokemon.current_level = pokemonInput.desiredLevel;
    newPokemon.selected_moves = pokemonInput.selectedMoves;
    newPokemon.hit_points = selectedPokemon.calculateHP(pokemonInput.desiredLevel);
    newPokemon.current_hit_points = selectedPokemon.calculateHP(pokemonInput.desiredLevel);
    newPokemon.stab =
      pokemonInput.desiredLevel < 3
        ? 0
        : pokemonInput.desiredLevel < 7
        ? 1
        : pokemonInput.desiredLevel < 11
        ? 2
        : pokemonInput.desiredLevel < 15
        ? 3
        : pokemonInput.desiredLevel < 19
        ? 4
        : 5;
    newPokemon.proficiency_bonus =
      pokemonInput.desiredLevel < 3
        ? 2
        : pokemonInput.desiredLevel < 9
        ? 3
        : pokemonInput.desiredLevel < 13
        ? 4
        : pokemonInput.desiredLevel < 17
        ? 5
        : 6;
    newPokemon.selected_ability = pokemonInput.selectedAbility;
    if (newPokemon) {
      return newPokemon; // Explicit success return
    }

    return null; // Explicit fallback if newPokemon is null or undefined
  } catch (error) {
    console.error("Error generating Pokemon:", error);
    return null; // Return false in case of any errors
  }
};
