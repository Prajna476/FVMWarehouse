export const Addresses = () => {
  return (
    <div className="text-left text-sm w-full pb-12 lg:pb-0">
      <div>
        <div className="hidden lg:inline">
          Text-to-image AI contract:<br/>
          <a
            className="underline"
            href={`https://explorer.galadriel.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}?tab=transactions`}
            target="_blank"
          >
            {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
          </a>
        </div>
        <div className="inline lg:hidden">
          Text-to-image AI contract:<br/>
          <a
            className="underline"
            href={`https://explorer.galadriel.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}?tab=transactions`}
            target="_blank"
          >
            {(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "").slice(0, 10)}...
          </a>
        </div>
      </div>
    </div>
  );
};

export default Addresses;