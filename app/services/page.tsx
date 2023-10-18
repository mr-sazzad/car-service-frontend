const Services = () => {
  return (
    <div className="container mx-auto flex flex-col gap-5 lg:flex-row mt-16 lg:px-[50px]">
      <div className="h-[150px] lg:h-[100vh] w-full lg:w-[300px] lg:border-r border-r-gray-200">
        <p className="text-center mt-5 text-orange-500 font-medium">
          Search Bar
        </p>
      </div>
      <div>Content</div>
    </div>
  );
};

export default Services;
