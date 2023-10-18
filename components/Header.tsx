const Header = () => {
  return (
    <div className="header-bg h-[60vh] md:h-[80vh] relative container mx-auto">
      <div className="h-full absolute top-0 bottom-0 right-0 left-0 bg-black/60">
        <span className="bg-indigo-50 px-5 py-2 rounded-md absolute left-[5%] md:left-[25%] lg:left-[32%] top-[30%] md:top-[33%] text-xs">
          🎉 THE TRUSTED NAME IN AUTO REPAIR
        </span>
        <div className="flex flex-col justify-center items-center h-full text-orange-500">
          <h2 className="text-5xl md:text-6xl font-semibold hover:text-orange-600 transition">
            WE CARE ABOUT
          </h2>
          <h2 className="text-5xl md:text-6xl font-semibold hover:text-orange-600 transition">
            MORE THAN CAR
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
