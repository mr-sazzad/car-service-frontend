const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="text-2xl mt-4 -ml-5 text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
