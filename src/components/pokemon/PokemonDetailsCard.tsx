import React from "react";

interface PokemonDetailsCardProps {
  title: string;
  details: string | number | null | undefined;
}

const PokemonDetailsCard: React.FC<PokemonDetailsCardProps> = ({
  title,
  details,
}) => {
  return (
    <div className="p-2 rounded-b text-black">
      <h1 className="font-bold text-2xl">{title}</h1>
      <p className="">{details}</p>
    </div>
  );
};

export default PokemonDetailsCard;