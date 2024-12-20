import { ITable } from "@/interfaces/database/ITable";
import { Character } from "../Character";
import { ICrud } from "@/interfaces/database/ICrud";
import toast from "react-hot-toast";
import { Pokemon } from "../Pokemon";

export class CharacterTable implements ITable<Character>, ICrud<Character> {
  tableName: string;
  records: Character[];

  constructor(tableName: string = "CharacterTable") {
    this.tableName = tableName;
    this.records = this.loadTableFromStoage();

    this.saveTableToStorage();
  }
  create(record: Character): void {
    this.records.push(record);
    toast.success(`Character ${record.name} Created Successfully`);
  }

  read(id?: string): Character | Character[] | undefined {
    if(id) {
      const recordIndex = this.records.findIndex((record) => record.id === id);
      return this.records[recordIndex];
    } 

    return this.records;
  }

  readByName(name: string): Character | undefined {    
    if(name) {
      const foundCharacter = this.records.find((record) => record.name === name);
      return foundCharacter;
    }
  }

  update(id: string, updatedRecord: Partial<Character>): boolean {
    const recordIndex = this.records.findIndex((record) => record.id === id);

    if(recordIndex === -1) {
      toast.error(`Character with id ${id} not found.`);
      return false;
    }

    const existingRecord = this.records[recordIndex];
    const updatedCharacter = {
      ...existingRecord,
      ...updatedRecord,

      ownedPokemon: updatedRecord.ownedPokemon ? [...new Set([...existingRecord.ownedPokemon, ...updatedRecord.ownedPokemon])] : existingRecord.ownedPokemon
    };

    this.records[recordIndex] = updatedCharacter as Character;
    this.saveTableToStorage();
    toast.success(`Character ${existingRecord.name} updated successfully`);
    return true;
  }

  updatePokemon(characterId: string, pokemonId: string, updatedPokemonValue: Partial<Pokemon>): boolean {
    const characterIndex = this.records.findIndex((character) => character.id === characterId);
    const pokemonIndex = this.records[characterIndex].ownedPokemon.findIndex((pokemon) => pokemon.id === pokemonId);

    const existingPokemon = this.records[characterIndex].ownedPokemon[pokemonIndex];
    const updatedPokemon = {
      ...existingPokemon,
      ...updatedPokemonValue
    };

    this.records[characterIndex].ownedPokemon[pokemonIndex] = updatedPokemon as Pokemon;

    this.saveTableToStorage();
    return true;
  }

  delete(id: string): boolean {
    throw new Error("Method not implemented.");
  }

  loadTableFromStoage(): Character[] {
    const data = JSON.parse(
      localStorage.getItem(this.tableName)!
    ) as CharacterTable;

    if (data) {
      return data.records;
    }

    return [];
  }

  saveTableToStorage(): void {
    localStorage.setItem(this.tableName, JSON.stringify(this));
  }

  getNumberOfRecords(): number {
    return this.records.length;
  }

  exists(name: string): boolean {
    const foundIndex = this.records.findIndex((record) => record.name === name);
    if(foundIndex !== -1) {
      return true;
    }

    return false;
  }

  getExistingRecords(): Character[] {
    return this.records;
  }
}
