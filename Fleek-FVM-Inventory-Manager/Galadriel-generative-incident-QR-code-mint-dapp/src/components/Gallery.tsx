import ProgressBar from "@/components/ProgressBar";

interface Props {
  isMintingLoading: boolean
  isLoading: boolean
  // Need tokenIds and stuff?
  nfts: Nft[]
  type: "user" | "other"
}

export interface Nft {
  tokenUri: string
  txHash?: string
}

export const Gallery = ({isMintingLoading, isLoading, nfts, type}: Props) => {

  return <div className="w-full py-6">
    {isLoading ?
      <div>Loading...</div>
      :
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {isMintingLoading &&
            <div
              className="md:basis-1/5 square relative"
            >
              <MintLoading/>
            </div>
          }
          {(nfts || []).slice(0, isMintingLoading ? 4 : 5).map((nft, i) =>
            <div
              key={`nft_${type}_${i}`}
              className="basis-1/5"
            >
              <img
                src={nft.tokenUri}
                alt={`nft_${type}_${i}`}
              />
              <div className="md:hidden">
                {nft.txHash && <div>
                  <a
                    className="underline"
                    href={`https://explorer.galadriel.com/tx/${nft.txHash}`}
                    target="_blank"
                  >
                    {nft.txHash.slice(0, 12)}...
                  </a>
                </div>}
              </div>
            </div>
          )}
        </div>

        <div className="hidden md:flex flex-col md:flex-row gap-10 items-center ">
          {(nfts || []).slice(0, isMintingLoading ? 4 : 5).map((nft, i) => <div
            key={`nft_${type}_${i}`}
            className="basis-1/5"
          >
            {nft.txHash && <div>
              <a
                className="underline"
                href={`https://explorer.galadriel.com/tx/${nft.txHash}`}
                target="_blank"
              >
                <div className="hidden lg:block">
                  {nft.txHash.slice(0, 12)}...
                </div>
                <div className="block lg:hidden">
                  {nft.txHash.slice(0, 8)}...
                </div>
              </a>
            </div>}
          </div>)}
        </div>
        {(!(nfts || []).length && !isMintingLoading) && <div>
          {type === "other" ?
            <div>Make sure your wallet RPC URL is https://devnet.galadriel.com/</div>
            :
            <div>No NFTs yet</div>
          }
        </div>}
      </div>

    }
  </div>
}

const MintLoading = () => {
  return <div className="square-content bg-[#B6B6B6] flex flex-col justify-end text-sm text-black">
    <div className="p-2">
      Generating & minting image...
    </div>
    <ProgressBar duration={10}/>
  </div>
}