import Image from "next/image";
import React from "react";

interface Worker {
  name: string;
  age: number;
  image: string;
  shortDesc: string;
}

interface PersonCardProps {
  person: Worker;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="card card-compact w-[300px] bg-base-100 shadow-xl border border-gray-300">
      <figure>
        <Image
          src={person.image}
          alt="profile-image"
          height={150}
          width={150}
          className="mt-5 rounded-full border-2 border-gray-500 p-1"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-orange-500 text-center text-2xl font-medium">
          {person.name}
        </h2>
        <p className="text-sm font-medium">Age: {person.age} Y</p>
        <div className="card-actions justify-end">
          <div>
            <p className="text-sm font-medium">Description:</p>
            <p>{person.shortDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
