import {useWeb3ModalAccount, useWeb3ModalProvider} from "@web3modal/ethers/react";
import {BrowserProvider, Contract, ethers, TransactionReceipt} from "ethers";
import ContentEditable from "react-contenteditable";
import {useCallback, useEffect, useRef, useState} from "react";
import {FONT_BOLD} from "@/fonts/fonts";
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {Gallery, Nft} from "@/components/Gallery";
import {ABI} from "@/types/network";

const HTML_REGULAR =
  /<(?!img|table|\/table|thead|\/thead|tbody|\/tbody|tr|\/tr|td|\/td|th|\/th|br|\/br).*?>/gi

export const Authenticated = () => {
  const {walletProvider} = useWeb3ModalProvider()
  const {address, chainId} = useWeb3ModalAccount()

  const textAreaRef = useRef<HTMLElement>(null)
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isMintingLoading, setIsMintingLoading] = useState(false)

  const [_, setUserNftsCount] = useState<number>(0)
  const userNfts = useRef<Nft[]>([])

  const [otherNfts, setOtherNfts] = useState<Nft[]>([])

  const [isUserNftsLoading, setIsUserNftsLoading] = useState<boolean>(false)
  const [isOtherNftsLoading, setIsOtherNftsLoading] = useState<boolean>(false)


  useEffect(() => {
    getUserNfts()
    getOtherNfts()
  }, [chainId])

  const getUserNfts = async () => {
    if (!walletProvider || !address) return
    setIsUserNftsLoading(true)
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "", ABI, signer)
    let indexedUserNfts: Nft[] = []
    for (let i = 0; i < 5; i++) {
      if ((userNfts.current || []).length > 5) break
      try {
        const token = await contract.tokenOfOwnerByIndex(address, i)
        if (token !== undefined) {
          const tokenUri = await contract.tokenURI(token)
          if (tokenUri) indexedUserNfts = [{tokenUri}, ...indexedUserNfts]
        }
      } catch (e) {
        break
      }
    }
    userNfts.current = [...userNfts.current, ...indexedUserNfts]
    setUserNftsCount(userNfts.current.length)
    setIsUserNftsLoading(false)
  }

  const getOtherNfts = async () => {
    if (!walletProvider || !address) return
    setIsOtherNftsLoading(true)
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "", ABI, signer)
    let indexedNfts: Nft[] = []
    try {
      const totalSupply = await contract.totalSupply()
      if (!totalSupply) return
      for (let i = Number(totalSupply) - 1; i >= 0; i--) {
        if (indexedNfts.length > 5 || otherNfts.length > 5) break
        try {
          const tokenUri = await contract.tokenURI(i)
          if (tokenUri) indexedNfts = [...indexedNfts, {tokenUri}]
        } catch (e) {
          break
        }
      }
      setOtherNfts(indexedNfts)
    } catch (e) {

    }

    setIsOtherNftsLoading(false)
  }

  const onMint = useCallback(
    async (e: any) => {
      const input = (textAreaRef.current?.innerHTML?.replace(HTML_REGULAR, '') || '')
        .replace(/(<br\s*\/?>\s*)+$/, '')
      if (!walletProvider || !input) return

      setIsLoading(true)
      try {
        const ethersProvider = new BrowserProvider(walletProvider)
        const signer = await ethersProvider.getSigner()
        const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "", ABI, signer)
        const tx = await contract.initializeMint(input)
        const receipt = await tx.wait()
        setMessage("")
        const tokenId = getNftId(receipt, contract)
        if (tokenId !== undefined) {
          setIsMintingLoading(true)
          const tokenUri = await pollTokenUri(contract, tokenId)
          if (tokenUri) {
            userNfts.current = [
              {tokenUri, txHash: receipt.hash},
              ...userNfts.current,
            ]
            setUserNftsCount(userNfts.current.length)

          }
        }

      } catch {
      }
      setIsLoading(false)
      setIsMintingLoading(false)
    },
    [walletProvider, isLoading]
  )

  const getNftId = (receipt: TransactionReceipt, contract: Contract): number | undefined => {
    let nftId
    for (const log of receipt.logs) {
      try {
        const parsedLog = contract.interface.parseLog(log)
        if (parsedLog && parsedLog.name === "MintInputCreated") {
          // Second event argument
          nftId = ethers.toNumber(parsedLog.args[1])
        }
      } catch (error) {
        // This log might not have been from your contract, or it might be an anonymous log
        console.log("Could not parse log:", log)
      }
    }
    return nftId;
  }

  const pollTokenUri = async (contract: Contract, tokenId: number): Promise<string | undefined> => {
    // max amount of time to wait
    for (let i = 0; i < 120; i++) {
      try {
        const uri = await contract.tokenURI(tokenId)
        if (uri) return uri
      } catch (e) {
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  const handleKeypress = useCallback(
    (e: any) => {
      if (e.keyCode == 13 && !e.shiftKey) {
        onMint(e)
        e.preventDefault()
      }
    },
    [onMint]
  )

  return <div className="w-full px-2 md:px-20 flex flex-col gap-16">
    <div>
      <div className="pb-4">
        Start with a detailed description
      </div>
      <div className="flex flex-row">
        <div
          className="rt-TextAreaRoot rt-r-size-1 rt-variant-surface flex-1 chat-textarea bg-[#002360]"
          style={{borderBottom: "2px solid white"}}
        >
          <ContentEditable
            innerRef={textAreaRef}
            style={{
              minHeight: "50px",
              maxHeight: "200px",
              overflowY: "auto",
              fontSize: "18px",
              paddingTop: "13px",
              paddingBottom: "13px",
            }}
            className="rt-TextAreaInput text-base focus:outline-none flex px-2"
            html={message}
            disabled={isLoading}
            onChange={(e) => {
              setMessage(e.target.value.replace(HTML_REGULAR, ''))
            }}
            onKeyDown={(e) => {
              handleKeypress(e)
            }}
          />
          <div className="rt-TextAreaChrome"></div>
        </div>
        <button
          className={"flex flex-row items-center gap-2 px-5 py-2 hover:bg-white hover:text-black duration-150  text-black bg-[#0F6] text-4xl " + FONT_BOLD.className}
          onClick={onMint}
        >

          {isLoading && <AiOutlineLoading3Quarters className="animate-spin size-4"/>}
          Generate
        </button>
      </div>
    </div>

    <div>
      <div className="text-xl">My NFTs</div>
      <Gallery
        isMintingLoading={isMintingLoading}
        isLoading={isUserNftsLoading}
        nfts={userNfts.current}
        type={"user"}
      />
    </div>

    <div>
      <div className="text-xl"> Others&apos; NFTs</div>

      <Gallery
        isMintingLoading={false}
        isLoading={isOtherNftsLoading}
        nfts={otherNfts}
        type={"other"}
      />
    </div>

  </div>
}