"use client"

import {FONT} from "@/fonts/fonts";
import {useWeb3Modal, useWeb3ModalAccount} from '@web3modal/ethers/react'
import {Authenticated} from "@/components/authenticated/Authenticated";
import Navbar from "@/components/navbar";
import {BuildWithGaladriel} from "@/components/buildwithgaladriel";
import Addresses from "@/components/Addresses";


export function Landing() {
  const {open} = useWeb3Modal()

  const {address} = useWeb3ModalAccount()


  return (
    <main className="flex min-h-screen flex-col items-center gap-20 p-2 lg:p-12 justify-between z-2 relative">
      <Navbar/>

      {!address ?
        <div
          className={"flex flex-col gap-6 text-center text-xl pb-40 " + FONT.className}
        >
          <div className="text-2xl lg:text-8xl">
            Text-to-image brought on chain
          </div>
          <div
            className="text-4xl pt-10"
          >
            Use generative AI to create dynamic, on-chain NFTs
          </div>
          <div className="pt-[100px]">
            <button
              onClick={() => open()}
              className={"p-4 bg-[#00FF66] text-3xl text-black hover:bg-[#00b548] duration-200 " + FONT.className}
            >
              Connect wallet to Mint
            </button>
          </div>
          <div className="text-4xl pt-32">
            Connect to
            <a
              href="https://docs.galadriel.com/setting-up-a-wallet"
              target="_blank"
              className="px-2 underline"
            >
              Galadriel devnet
            </a>
            and to mint, get tokens from
            <a
              href="https://discord.gg/4UuffUbkjb"
              target="_blank"
              className="px-2 underline"
            >
              faucet
            </a>
          </div>
        </div>
        :
        <Authenticated/>
      }


      <div
        className={"flex w-full flex-col lg:flex-row lg:justify-between items-end text-xl p-4 lg:p-0"}>
        <Addresses/>
        <BuildWithGaladriel/>
      </div>
    </main>
  )
}
