import TiresCard from "./Card1";
import OilCard from "./Card2";

const LatestNews = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
        <div
          className="
            h-[150px] 
            w-full 
            bg-gray-50 
            flex 
            justify-center 
            items-center
          "
        >
          <h1
            className="
              text-center 
              text-4xl 
              font-semibold 
              text-orange-600 
              my-5 
              hover:text-5xl 
              transition-all 
              ease-in 
              duration-300
            "
          >
            # Latest News
          </h1>
        </div>
        <div className="flex justify-center w-full">
          <div
            className="
              flex 
              flex-col 
              md:flex-row 
              flex-wrap 
              justify-between 
              w-full 
              gap-5
            "
          >
            <div className="flex-1">
              <TiresCard />
            </div>
            <div className="flex-1">
              <OilCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
