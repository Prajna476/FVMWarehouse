import React from 'react';
import Link from 'next/link';
import {FONT} from "@/fonts/fonts";

export const Navbar = () => {
  return (
    <nav className={"text-white my-5 text-xl w-full " + FONT.className}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end">
          <Link href="https://galadriel.com" target='_blank' className="px-3 py-2 rounded-md font-medium">about</Link>
          <Link href="https://discord.gg/4UuffUbkjb" target="_blank" className="px-3 py-2 rounded-md font-medium">faucet</Link>
          <Link href="https://twitter.com/Galadriel_AI" target='_blank' className="px-3 py-2 rounded-md font-medium">x</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;