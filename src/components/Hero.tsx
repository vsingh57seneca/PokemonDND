import React, { ReactNode } from "react";

interface HeroProps {
  title: string;
  sub_title: string;
  actionButton?: ReactNode;
  height?: string
}

const Hero: React.FC<HeroProps> = ({ title, sub_title, actionButton, height}) => {
  return (
    <section className={`space-y-6 flex flex-col justify-center ${height ? height : 'h-[60vh]'}`}>
      <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400">{title}</h1>
      <p className="text-xl sm:text-2xl text-blue-400 font-semibold">{sub_title}</p>
      <div className="">{actionButton}</div>
    </section>
  );
};

export default Hero;
