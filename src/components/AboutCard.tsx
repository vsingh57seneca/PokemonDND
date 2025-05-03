import React from "react";

interface AboutCardProps {
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ title, description }) => {
  return (
    <div className="bg-neutral-600 rounded p-4">
      <h1 className="text-3xl font-bold mb-2 text-yellow-400">{title}</h1>
      <p className="text-xl">
        {description}
      </p>
    </div>
  );
};

export default AboutCard;
