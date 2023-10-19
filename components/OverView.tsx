import Image from "next/image";

const OverView = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
        <div className="flex flex-col lg:flex-row lg:gap-5 lg:justify-between relative">
          <div className="flex flex-col flex-1 mr-5">
            <div className="mb-5">
              <h2 className="text-4xl font-bold">WE MAKE AUTO REPAIR</h2>
              <h2 className="text-4xl font-bold">MORE CONVENIENT</h2>
            </div>
            <p className="font-medium mb-10">
              Car Service has over 200 locations across the Bangladesh and India
              to provide car maintenance and car repair services wherever you
              are.
            </p>
            <div className="mt-5 flex justify-between gap-5">
              <div className="">
                <h2 className="text-5xl pr-4 inline-flex font-bold hover:-mt-2 hover:pb-2 transition-all duration-150 border-b-2 border-orange-500">
                  2K+
                </h2>
                <p className="font-medium text-sm mt-5">
                  International standard process and large factory system
                </p>
              </div>
              <div>
                <h2 className="text-5xl pr-4 inline-flex font-bold hover:-mt-2 hover:pb-2 transition-all duration-150 border-b-2 border-orange-500">
                  2+
                </h2>
                <p className="font-medium text-sm mt-5">
                  More than 2 years of operation in the field of Car Services
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-1 relative">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/assets/car-repair.jpg"
                alt="car-repair-image"
                layout="responsive"
                width={500}
                height={500}
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gray-400 opacity-40 hover:opacity-0 hover:bg-none transition-all duration-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
