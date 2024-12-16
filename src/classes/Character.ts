import { ICharacter } from "@/interfaces/character/ICharacter";
import { Pokemon } from "./Pokemon";
import { v4 as uuidv4 } from "uuid";

export class Character{
    id: string;
    name: string;
    pokemon: Pokemon[];

    constructor(name: string, pokemon: Pokemon[]) {
        this.id = uuidv4();
        this.name = name;
        this.pokemon = pokemon;
    }

    getAllPokemon = () => {
        return this.pokemon;
    }

    removePokemonById = (pokemonId: string): void => {
        this.pokemon = this.pokemon.filter(p => p.id !== pokemonId);
    }

}