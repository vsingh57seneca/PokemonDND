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
}
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
  }
  

export const generatePokemon = (
  selectedPokemon: Pokemon,
  givenName: string,
  desiredLevel: number,
  selectedMoves: string[]
): boolean => {
  try {
    const newPokemon = new Pokemon(selectedPokemon);
    newPokemon.id = uuidv4();
    newPokemon.given_name = givenName;
    newPokemon.current_level = desiredLevel;
    newPokemon.selected_moves = selectedMoves;
    newPokemon.hit_points = selectedPokemon.calculateHP(desiredLevel);
    newPokemon.current_hit_points = selectedPokemon.calculateHP(desiredLevel);
    newPokemon.stab = desiredLevel < 3 ? 0 : desiredLevel < 7 ? 1 : desiredLevel < 11 ? 2 : desiredLevel < 15 ? 3 : desiredLevel < 19 ? 4 : 5
    newPokemon.proficiency_bonus = desiredLevel < 3 ? 2 : desiredLevel < 9 ? 3 : desiredLevel < 13 ? 4 : desiredLevel < 17 ? 5 : 6
    if (newPokemon) {
      addPokemonToSelectedCharacter(newPokemon);
      return true; // Explicit success return
    }

    return false; // Explicit fallback if newPokemon is null or undefined
  } catch (error) {
    console.error("Error generating Pokemon:", error);
    return false; // Return false in case of any errors
  }
};

/**
 * Adds a Pokemon to the selected character's Pokemon list in localStorage
 * and updates the overall characters list in localStorage.
 * @param pokemon - The Pokemon instance to be added.
 */
export function addPokemonToSelectedCharacter(pokemon: Pokemon): void {
  // Check if localStorage is available
  if (typeof window === "undefined") {
    console.error("localStorage is not available.");
    return;
  }

  // Retrieve selected_character from localStorage
  const selectedCharacter = JSON.parse(
    localStorage.getItem("selected_character") || "{}"
  );

  // Ensure selected_character has a pokemon array
  if (!selectedCharacter || !selectedCharacter.id) {
    console.error("No selected_character found in localStorage.");
    return;
  }

  if (!selectedCharacter.pokemon) {
    selectedCharacter.pokemon = [];
  }

  // Add the new Pokemon to the pokemon array
  selectedCharacter.pokemon.push(pokemon);

  // Save updated selected_character back to localStorage
  localStorage.setItem(
    "selected_character",
    JSON.stringify(selectedCharacter)
  );

  // Retrieve all characters from localStorage
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  // Check if the selected character already exists in the characters array
  const updatedCharacters = characters.map((char: any) =>
    char.id === selectedCharacter.id ? selectedCharacter : char
  );

  // Ensure other characters are preserved and no overwrites occur
  const selectedCharacterExists = updatedCharacters.some(
    (char: any) => char.id === selectedCharacter.id
  );

  if (!selectedCharacterExists) {
    updatedCharacters.push(selectedCharacter);
  }

  // Save updated characters list back to localStorage
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
}


/**
 * Removes a Pokemon from the selected character's Pokemon list in localStorage
 * and updates the overall characters list in localStorage.
 * @param pokemonId - The ID of the Pokemon to be removed.
 */
export function removePokemonFromSelectedCharacter(pokemonId: string): void {
  console.log("Removing Pokemon with ID:", pokemonId);

  // Check if localStorage is available
  if (typeof window === "undefined") {
    console.error("localStorage is not available.");
    return;
  }

  // Retrieve selected_character from localStorage
  const selectedCharacter = JSON.parse(
    localStorage.getItem("selected_character") || "{}"
  );

  // Ensure selected_character has a valid structure
  if (!selectedCharacter || !selectedCharacter.id || !Array.isArray(selectedCharacter.pokemon)) {
    console.error("No valid selected_character found in localStorage.");
    return;
  }

  // Filter out the Pokemon with the specified ID
  selectedCharacter.pokemon = selectedCharacter.pokemon.filter(
    (pokemon: Pokemon) => pokemon.id !== pokemonId
  );

  // Save the updated selected_character back to localStorage
  localStorage.setItem(
    "selected_character",
    JSON.stringify(selectedCharacter)
  );

  // Retrieve all characters from localStorage
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  // Update the corresponding character in the characters array
  const updatedCharacters = characters.map((char: any) =>
    char.id === selectedCharacter.id ? selectedCharacter : char
  );

  // Ensure other characters are preserved and no overwrites occur
  const selectedCharacterExists = updatedCharacters.some(
    (char: any) => char.id === selectedCharacter.id
  );

  if (!selectedCharacterExists) {
    updatedCharacters.push(selectedCharacter);
  }

  // Save the updated characters list back to localStorage
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
}

/**
 * Updates a Pokemon in the selected character's Pokemon list by ID
 * and updates the overall characters list in localStorage.
 * @param pokemonId - The ID of the Pokemon to be updated.
 * @param updatedData - The updated Pokemon data to merge with the existing Pokemon.
 */
export function updatePokemonInSelectedCharacter(
  pokemonId: string,
  updatedData: Partial<Pokemon>
): void {
  console.log("Updating Pokemon with ID:", pokemonId);

  // Check if localStorage is available
  if (typeof window === "undefined") {
    console.error("localStorage is not available.");
    return;
  }

  // Retrieve selected_character from localStorage
  const selectedCharacter = JSON.parse(
    localStorage.getItem("selected_character") || "{}"
  );

  // Ensure selected_character has a valid structure
  if (!selectedCharacter || !selectedCharacter.id || !Array.isArray(selectedCharacter.pokemon)) {
    console.error("No valid selected_character found in localStorage.");
    return;
  }

  // Find and update the Pokemon by ID
  const updatedPokemonList = selectedCharacter.pokemon.map((pokemon: Pokemon) =>
    pokemon.id === pokemonId ? { ...pokemon, ...updatedData } : pokemon
  );

  // Update the selected_character with the new Pokemon list
  selectedCharacter.pokemon = updatedPokemonList;

  // Save the updated selected_character back to localStorage
  localStorage.setItem(
    "selected_character",
    JSON.stringify(selectedCharacter)
  );
  console.log("Updated Selected Character saved to localStorage:", selectedCharacter);

  // Retrieve all characters from localStorage
  const characters = JSON.parse(localStorage.getItem("characters") || "[]");

  // Update the corresponding character in the characters array
  const updatedCharacters = characters.map((char: any) =>
    char.id === selectedCharacter.id ? selectedCharacter : char
  );

  // Ensure other characters are preserved and no overwrites occur
  const selectedCharacterExists = updatedCharacters.some(
    (char: any) => char.id === selectedCharacter.id
  );

  if (!selectedCharacterExists) {
    updatedCharacters.push(selectedCharacter);
  }

  // Save the updated characters list back to localStorage
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  console.log("Updated Characters List saved to localStorage:", updatedCharacters);
}