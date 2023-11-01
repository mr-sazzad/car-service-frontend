const Header = () => {
  return (
    <div className="header-bg h-[40vh] md:h-[80vh] relative container mx-auto">
      <div className="h-full absolute top-0 bottom-0 right-0 left-0 bg-black/60">
        <div className="flex flex-col justify-center items-center h-full">
          <div>
            <span className="bg-indigo-50 px-5 py-2 rounded-md text-xs -ml-2">
              🎉 THE TRUSTED NAME IN AUTO REPAIR
            </span>
            <h2 className="text-4xl sm:text-5xl text-orange-500 md:text-6xl font-semibold hover:text-orange-600 transition mt-6">
              WE CARE ABOUT
            </h2>
            <h2 className="text-4xl sm:text-5xl text-orange-500 md:text-6xl font-semibold hover:text-orange-600 transition">
              MORE THAN CAR
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
