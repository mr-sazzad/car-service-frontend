import Image from "next/image";

const OilCard = () => {
  return (
    <div className="bg-black">
      <div className="flex flex-row relative">
        <div className="flex-col gap-3 p-10">
          <p className="text-lg font-medium text-white mb-2 tracking-widest">
            IT&apos;S THAT TIME AGAIN
          </p>
          <div className="leading-[2px]">
            <p className="text-5xl font-bold text-red-700">20% OFF</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="mt-9">
              <p className="text-3xl font-bold text-white">STANDARD</p>
              <p className="text-3xl font-bold text-white">OIL CHANGE</p>
            </div>
          </div>
          <div className="mt-10 font-sm text-red-800 hover:font-bold transition-all duration-300">
            EVENTS STARTS SOON
          </div>
        </div>
        <div className="absolute right-0 bottom-0 overflow-hidden">
          <Image
            src="/assets/change-oil.png"
            alt="oil-image"
            height={400}
            width={400}
          />
        </div>
      </div>
    </div>
  );
};

export default OilCard;
