const TiresCard = () => {
  return (
    <div className="flex-1 w-full">
      <div className="latest-news-bg-1 flex-col gap-3 w-full p-10">
        <p className="text-lg font-medium text-white mb-2">NEW ARRIVALS</p>
        <div className="leading-[2px]">
          <p className="text-3xl font-bold text-white">GET QUALITY TIRES</p>
          <br />
          <p className="text-3xl font-bold text-white">AT A GREAT VALUE</p>
        </div>
        <div className=" inline-flex">
          <div className="mt-5 bg-red-800 px-6 py-2 border-[3px] border-dashed box-border border-black">
            <div className="flex gap-3">
              <div className="flex flex-col gap-3 leading-[3px]">
                <div className="text-4xl font-bold text-white mt-3">$</div>
                <div className="text-white font-bold">GET</div>
              </div>
              <div>
                <h2 className="text-8xl font-bold text-white">50</h2>
              </div>
            </div>
            <div className="-mt-3">
              <p className="font-bold text-white">OFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiresCard;
