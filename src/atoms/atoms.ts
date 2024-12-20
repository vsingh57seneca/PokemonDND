import { Character } from '@/classes/Character';
import { CharacterTable } from '@/classes/database/CharacterTable';
import { Pokemon } from '@/classes/Pokemon';
import { atom } from 'jotai';

export const pokemonListAtom = atom<Pokemon[]>([]);
export const characterTableAtom = atom<CharacterTable>();
export const selectedCharacterAtom = atom<Character>();
export const selectedPokemonAtom = atom<Pokemon>();