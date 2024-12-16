import { Character } from '@/classes/Character';
import { Pokemon } from '@/classes/Pokemon';
import { atom } from 'jotai';

export const pokemonListAtom = atom<Pokemon[]>([]);
export const selectedCharacterAtom = atom<Character>();