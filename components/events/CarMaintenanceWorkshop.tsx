const CarMaintenanceWorkshop = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex justify-center items-center max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-5 bg-slate-200 p-5 rounded-md border-2 border-slate-300">
              <div className="flex-1 lg:w-full lg:h-auto event-bg h-[300px]">
                <div className="bg-black/40 h-full w-full">
                  <p className="z-50 flex justify-center items-center h-full text-5xl font-bold text-orange-500 shadow-sm py-5">
                    Car Maintenance Workshop
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <p>
                  Car maintenance workshop is a vital lifeline for any car
                  owner. These sessions provide essential insights into caring
                  for your vehicle, from routine checks to troubleshooting
                  common issues. Attending these workshops isn&apos;t just about
                  learning; it&apos;s about safeguarding your investment. By
                  mastering basic maintenance tasks, you can prevent costly
                  repairs and ensure your car runs smoothly for years to come.
                  Beyond the practical skills, these workshops create a sense of
                  community, connecting you with fellow enthusiasts and
                  fostering a culture of shared knowledge and support. Invest in
                  these workshops, and you&apos;ll not only save money but also
                  gain the confidence to handle any car-related challenges that
                  come your way.
                </p>
                <div className="flex justify-end">
                  <button className="bg-orange-500 px-4 py-1">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarMaintenanceWorkshop;
