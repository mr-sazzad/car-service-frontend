import carWorkers from "@/app/constants/team";
import PersonCard from "./PersonCard";

type Worker = {
  name: string;
  age: number;
  image: string;
  shortDesc: string;
};

const OurTeam = () => {
  return (
    <div className="container mx-auto my-5">
      <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
        <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
          # Our Team
        </h1>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
        <div className="flex flex-col md:flex-row gap-5 flex-wrap justify-center items-center">
          {carWorkers.map((worker: Worker) => (
            <PersonCard key={worker.age} person={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeam;
