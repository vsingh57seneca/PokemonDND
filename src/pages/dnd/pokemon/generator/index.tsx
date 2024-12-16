import { pokemonListAtom, selectedCharacterAtom } from "@/atoms/atoms";
import { Pokemon } from "@/classes/Pokemon";
import { addPokemonToSelectedCharacter, convertToPokemonObjects, generatePokemon } from "@/functions/PokemonHelperFunctions";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const [pokemonList, setPokemonList] = useAtom(pokemonListAtom);
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();
  const [search, setSearch] = useState<string>("");

  const [givenName, setGivenName] = useState<string>("");
  const [desiredLevel, setDesiredLevel] = useState<number>(1);
  const [selectedMoves, setSelectedMoves] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonList.length <= 0) {
        setPokemonList(await convertToPokemonObjects());
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(pokemonList);
  }, [pokemonList]);

  useEffect(() => {
    setDesiredLevel(Number(selectedPokemon?.level));
  }, [selectedPokemon])

  const onGeneratePokemon = async () => {
    const wasGenerated = generatePokemon(selectedPokemon!, givenName, desiredLevel, selectedMoves);

    if(wasGenerated) {
        router.push("/dnd/pokemon");
    }
  }

  return (
    <div className="flex flex-col items-center p-4 gap-y-4">
      <h1 className="font-bold">Pokemon Generator</h1>
      <div className="w-full flex flex-col gap-y-4">
        <h1 className="mb-4">Select a Pokemon:</h1>

        {/* Search Bar */}
        <div className="flex h-full items-center gap-x-2">
          <FaSearch className="text-white" />
          <input
            className="text-black px-2 w-full"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-56 overflow-y-auto px-4">
          {pokemonList
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((pokemon) => (
              <div
                key={pokemon.name}
                className={`select-none cursor-pointer hover:border-green-500 col-span-1 border flex justify-center rounded ${
                  selectedPokemon &&
                  selectedPokemon.name === pokemon.name &&
                  "border-green-500"
                }`}
                onClick={() => setSelectedPokemon(pokemon)}
              >
                <div className="flex items-center justify-around w-full">
                  <img src={pokemon.image} width={50} />
                  <div className="text-sm">
                    <p>{pokemon.name}</p>
                    <p>Level: {pokemon.level}</p>
                    <p>SR: {pokemon.sr}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {selectedPokemon && (
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full">
              <img src={selectedPokemon.image} />
              <div className="flex flex-col gap-y-2 items-center w-full">
                <p>{selectedPokemon.name}</p>

                {/* Given Name Input */}
                <input
                  type="text"
                  placeholder="Given Name"
                  className="px-2 border rounded text-black"
                  value={givenName}
                  onChange={(e) => setGivenName(e.target.value)}
                />

                {/* Given Level Input */}
                <input
                  type="number"
                  placeholder="Desired Level"
                  className="px-2 border rounded text-black"
                  value={desiredLevel}
                  onChange={(e) => {
                    if (Number(e.target.value) <= 0) {
                      setDesiredLevel(1);
                    } else {
                      setDesiredLevel(Number(e.target.value));
                    }
                  }}
                  min={1}
                  defaultValue={1}
                />

                {/* Moves */}
                <div className="flex w-full justify-around items-center p-4">
                  {/* Known Moves */}
                  <div className="flex flex-col gap-y-2">
                    <h1>Known Moves</h1>
                    <div className="h-32 min-w-36 border overflow-y-auto p-4">
                      {Object.entries(selectedPokemon.moves)
                        .filter(
                          ([key, _]) =>
                            key === "starting_moves" ||
                            Number(key) <= desiredLevel
                        )
                        .map(([key, value]) => (
                          <>
                            {value
                              .filter(
                                (move: string) => !selectedMoves.includes(move)
                              )
                              .map((move: string, index: number) => (
                                <p
                                  key={`${key}-${move}`}
                                  onClick={() => {
                                    if (selectedMoves.length < 4) {
                                      setSelectedMoves((prevValue) =>
                                        prevValue.includes(move)
                                          ? prevValue
                                          : [...prevValue, move]
                                      );
                                    }
                                  }}
                                  className={`cursor-pointer hover:bg-green-500 px-2 py-1 rounded text-center`}
                                >
                                  {move}
                                </p>
                              ))}
                          </>
                        ))}
                    </div>
                  </div>

                  {/* Selected Moves */}
                  {selectedMoves && (
                    <div className="flex flex-col gap-y-2">
                      <h1>Slected Moves</h1>
                      <div className="min-h-32 min-w-36 border overflow-y-auto p-4">
                        {selectedMoves.map((move) => (
                          <p
                            onClick={() =>
                              setSelectedMoves(
                                (prevValues) =>
                                  prevValues.includes(move)
                                    ? prevValues.filter(
                                        (selectedMove) => selectedMove !== move
                                      ) // Remove the move
                                    : [...prevValues, move] // Add the move
                              )
                            }
                            className={`cursor-pointer hover:bg-red-500 px-2 py-1 rounded text-center`}
                          >
                            {move}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Generate Button */}
                <button className="bg-green-500 p-3 rounded" onClick={onGeneratePokemon}>
                  Generate {givenName ? givenName : selectedPokemon.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default index;
