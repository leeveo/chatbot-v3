'use client';
import { accueil, couleur, icone, soustitre } from '@/lib/config';
import Image from 'next/image';
import React from 'react';

export const Header: React.FC = () => {
  return (
    <>
      <header
        className="fixed w-full h-[120px] p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none"
        style={{ backgroundColor: couleur }} // Use style prop for background color
      >
        <div className="flex items-center gap-4 pl-4">
          {/* Image ronde */}
          <div className="rounded-full mx-auto mt-2 border-solid border-4 bg-white border-white-600 shadow-xl">
            <Image
              src={icone} // Correctly use the variable without quotes
              alt="chatbot" // Text alternative
              width={70}
              height={70}
              className="rounded-full object-cover" // Rounded image
            />
          </div>

          {/* Text aligned to the right of the image */}
          <div className="flex flex-col text-white">
            <span className="font-bold text-sm italic">{accueil}</span>
            <span className="text-sm">{soustitre}</span>
          </div>
        </div>

        {/* Icons visible on both mobile and desktop */}
        <div className="flex gap-0.5 items-center">
          {/* <ModeToggle /> */}
          {/* <HistoryContainer location="header" /> */}
        </div>
      </header>
    </>
  );
};

export default Header;
