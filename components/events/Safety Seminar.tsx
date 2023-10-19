const SafetySeminar = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="flex justify-center items-center max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-5 bg-slate-200 p-5 rounded-md border-2 border-slate-300">
              <div className="flex-1 lg:w-full lg:h-auto event-bg h-[300px]">
                <div className="bg-black/40 h-full w-full">
                  <p className="z-50 flex justify-center items-center h-full text-5xl font-bold text-orange-500 shadow-sm py-5">
                    Safety Seminar
                  </p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <p>
                  Car safety seminars are vital for promoting responsible
                  driving practices and fostering a culture of vigilance on the
                  road. By emphasizing the significance of regular vehicle
                  maintenance and imparting practical emergency handling
                  techniques, these seminars equip participants with essential
                  skills for ensuring their safety and that of others. Attending
                  these sessions isn&apos;t just about learning; it&apos;s about
                  actively contributing to a safer driving environment and
                  cultivating a community that prioritizes road safety. Make
                  safety a priority, starting with these informative seminars,
                  and help create a more secure driving experience for all.
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-orange-300 px-4 py-1 mt-3 cursor-not-allowed text-white"
                    disabled
                  >
                    Registration Start Soon
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

export default SafetySeminar;
