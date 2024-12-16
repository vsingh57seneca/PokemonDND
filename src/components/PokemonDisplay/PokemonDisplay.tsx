import { Pokemon } from "@/classes/Pokemon";
import React, { useEffect, useState } from "react";
import PokemonHBBar from "../PokemonHPBar/PokemonHBBar";
import { Character } from "@/classes/Character";
import Modal from "../Modal/Modal";
import { fetchAllMoves } from "@/functions/PokemonHelperFunctions";

interface PokemonDisplayProps {
  selectedPokemon: Pokemon;
  selectedCharacter: Character;
  setSelectedCharacter: (selectedCharacter: Character) => void;
}

const PokemonDisplay: React.FC<PokemonDisplayProps> = ({ selectedPokemon, selectedCharacter, setSelectedCharacter }) => {
  const [showMoveDrawer, setShowMoveDrawer] = useState(false);
  const [movesList, setMovesList] = useState([]);
  const [targetedMove, setTargetedMove] = useState<any>();


  useEffect(() => {
    const fetchMoves = async () => {
      setMovesList(await fetchAllMoves());
    }

    fetchMoves();
  }, [])

  const handleMouseEnterMove = (move: string) => {
    setShowMoveDrawer(true);

    const foundMove = movesList.find((m: any) => m.name.toLowerCase() === move.toLowerCase());
    
    if(foundMove) {
      setTargetedMove(foundMove);
    }
  }

  const handleMouseLeaveMove = () => {
    setShowMoveDrawer(false);
    setTargetedMove(null);
  }

  useEffect(() => {
    console.log(targetedMove);
  }, [targetedMove])
  
  return (
    <div>
      {/* HP Bar */}
      <div className="">
        <PokemonHBBar selectedPokemon={selectedPokemon} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} />
      </div>
      <div className="grid grid-cols-4 p-4 h-full w-full gap-2">
        {/* Left */}
        <div className="col-span-1 flex flex-col gap-y-4 items-end">
          <h1>Moves:</h1>
          {selectedPokemon.selected_moves?.map((move) => (
            <p className={`rounded bg-blue-500 px-2 py-1 cursor-pointer w-fit text-center hover:bg-blue-700`} onMouseEnter={() => handleMouseEnterMove(move)} onMouseLeave={handleMouseLeaveMove}>
              {move}
            </p>
          ))}
        </div>

        {/* Right */}
        <div className="col-span-3 flex justify-center">
          <div className="flex flex-col items-center w-full gap-y-1">
            <img src={selectedPokemon.image} className="" />
            <p>
              {selectedPokemon.name}{" "}
              {selectedPokemon.given_name && (
                <span> {`(${selectedPokemon.given_name})`}</span>
              )}{" "}
              | Level: {selectedPokemon.current_level}
            </p>

            {/* Types */}
            <div className="flex gap-x-2">
              {selectedPokemon.type.map((t) => (
                <p>{t}</p>
              ))}
            </div>

            {/* Speeds */}
            <div className="flex gap-x-2">
              {selectedPokemon.speed.map((s) => (
                <p>{s}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="col-span-1 flex justify-end">
                Armor: {selectedPokemon.armor_class}
              </div>
              <div className="col-span-1">
                Proficiency: {selectedPokemon.proficiency_bonus}
              </div>
              <div className="col-span-1 flex justify-end">
                STAB: {selectedPokemon.stab}{" "}
              </div>
              <div className="col-span-1">
                Hit Dice: {selectedPokemon.hit_dice}
              </div>
            </div>

            <div className="grid grid-cols-6 text-xs text-center gap-x-1">
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">STR</h1>
                <span>
                  {selectedPokemon.stats["str"].value}{" "}
                  {selectedPokemon.stats["str"].modifier}
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">DEX</h1>
                <span>
                  {selectedPokemon.stats["dex"].value}{" "}
                  {selectedPokemon.stats["dex"].modifier}
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">CON</h1>
                <span>
                  {selectedPokemon.stats["con"].value}{" "}
                  {selectedPokemon.stats["con"].modifier}
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">INT</h1>
                <span>
                  {selectedPokemon.stats["int"].value}{" "}
                  {selectedPokemon.stats["int"].modifier}
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">WIS</h1>
                <span>
                  {selectedPokemon.stats["wis"].value}{" "}
                  {selectedPokemon.stats["wis"].modifier}
                </span>
              </div>
              <div className="col-span-1 flex flex-col">
                <h1 className="font-bold">CHA</h1>
                <span>
                  {selectedPokemon.stats["cha"].value}{" "}
                  {selectedPokemon.stats["cha"].modifier}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Proficient Skills */}
        <div className="col-span-4 lg:col-span-2 flex w-full">
          <p className="font-bold">
            Proficient Skills:{" "}
            {selectedPokemon.proficient_skills.map((ps) => (
              <span className="font-normal">{`${ps} `}</span>
            ))}
          </p>
        </div>

        {/* Vulnerabilities */}
        <div className="col-span-4 lg:col-span-2 flex w-full">
          <p className="font-bold">
            Vulnerabilities:{" "}
            {selectedPokemon.vulnerabilities.map((v) => (
              <span className="font-normal">{`${v} `}</span>
            ))}
          </p>
        </div>

        {/* Saving Throws */}
        <div className="col-span-4 lg:col-span-2 flex w-full">
          <p className="font-bold">
            Saving Throws:{" "}
            {selectedPokemon.saving_throws.map((st) => (
              <span className="font-normal">{`${st} `}</span>
            ))}
          </p>
        </div>

        {/* Resistances */}
        <div className="col-span-4 lg:col-span-2 flex w-full">
          <p className="font-bold">
            Resistances:{" "}
            {selectedPokemon.resistances.map((r) => (
              <span className="font-normal">{`${r} `}</span>
            ))}
          </p>
        </div>

        {/* Abilities */}

        {/* Ability */}
        <div className="col-span-4 flex w-full">
          <p className="font-bold">
            Ability:{" "}
            {selectedPokemon.abilities.map((ability) => (
              <p className="font-normal">{ability}</p>
            ))}
          </p>
        </div>

        {/* Hidden Ability */}
        <div className="col-span-4 flex w-full">
          <p className="font-bold">
            Hidden Ability:{" "}
            <p className="font-normal">{selectedPokemon.hidden_ability}</p>
          </p>
        </div>
      </div>
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/5 bg-slate-800 border-l shadow-lg transition-transform duration-300 ${
          showMoveDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {targetedMove ? (
          <div className="p-4 flex flex-col gap-y-4">
            <h2 className="text-lg font-bold mb-4">{targetedMove.name}</h2>
            <p>Type: {targetedMove.type}</p>
            <p>Move Power: {targetedMove.move_power}</p>
            <p>Move Time: {targetedMove.move_time}</p>
            <p>Range: {targetedMove.range}</p>
            <p>Duration: {targetedMove.duration}</p>
            <p>PP: {`${targetedMove.current_pp}/${targetedMove.pp}`}</p>
            <p>Description: {targetedMove.description}</p>
            {targetedMove.higher_levels && <p>Higher Levels: {targetedMove.higher_levels}</p>}
            
            {/* Add additional move details here */}
          </div>
        ) : (
          <div className="p-4">
            <p>No move selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonDisplay;
