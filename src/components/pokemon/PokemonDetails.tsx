import { selectedPokemonAtom } from "@/atoms/atoms";

import { useAtom } from "jotai";
import React from "react";
import PokemonDetailsCard from "./PokemonDetailsCard";

const PokemonDetails = () => {
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

  return (
    <>
      {selectedPokemon ? (
        <div className="gap-y-4 flex flex-col overflow-y-auto md:max-h-full p-2">
          <div className="grid gap-y-4 grid-cols-2 gap-6 md:p-6">
            <div className="col-span-full bg-gray-200 p-4 space-y-4 rounded">
              <div className="col-span-2 shadow-xl">
                <h1 className="font-bold text-4xl text-black">Details</h1>
                <PokemonDetailsCard
                  title="Type(s)"
                  details={selectedPokemon.type.join(", ")}
                />
              </div>

              <div className="col-span-1 shadow-xl">
                <PokemonDetailsCard
                  title="Level"
                  details={selectedPokemon.current_level}
                />
              </div>

              <div className="col-span-1 shadow-xl">
                <PokemonDetailsCard title="SR" details={selectedPokemon.sr} />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Armor Class"
                  details={selectedPokemon.armor_class}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Proficiency Bonus"
                  details={selectedPokemon.proficiency_bonus}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="STAB Bonus"
                  details={selectedPokemon.stab}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Hit Dice"
                  details={selectedPokemon.hit_dice}
                />
              </div>
            </div>

            <div className="col-span-full bg-gray-200 p-4 space-y-4 rounded">
              <h1 className="font-bold text-4xl text-black">Stats</h1>
              <div className="col-span-2">
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(selectedPokemon.stats).map(([key, value]) => (
                    <div className="col-span-1 shadow-xl">
                      <PokemonDetailsCard
                        title={key.toUpperCase()}
                        details={value.value + "\n" + value.modifier}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-full bg-gray-200 p-4 space-y-4 rounded">
              <h1 className="font-bold text-4xl text-black">Skills</h1>
              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Speed(s)"
                  details={selectedPokemon.speed.join(", ")}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Saving Throw(s)"
                  details={selectedPokemon.saving_throws.join(", ")}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Proficient Skill(s)"
                  details={selectedPokemon.proficient_skills.join(", ")}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Vulnerabilities"
                  details={selectedPokemon.vulnerabilities.join(", ")}
                />
              </div>

              <div className="col-span-2 shadow-xl">
                <PokemonDetailsCard
                  title="Resistances"
                  details={selectedPokemon.resistances.join(", ")}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="w-full flex justify-center items-center h-full">
          Select A Pokemon
        </p>
      )}
    </>
  );
};

export default PokemonDetails;
