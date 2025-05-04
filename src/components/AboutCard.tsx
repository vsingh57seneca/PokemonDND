import React from "react";

interface AboutCardProps {
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ title, description }) => {
  return (
    <div className="bg-neutral-800 rounded-xl shadow-xl shadow-neutral-600 p-8 min-h-80 flex flex-col">
      <h1 className="text-3xl lg:text-5xl font-bold mb-2 text-yellow-400">{title}</h1>
      <p className="text-xl lg:text-2xl flex-grow mt-6">
        {description}
      </p>
    </div>
  );
};

export default AboutCard;
