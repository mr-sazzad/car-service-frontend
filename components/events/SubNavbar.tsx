// SubNavBar.tsx
import React from "react";

type SubNavBarProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  activeSection: string;
};

const SubNavBar: React.FC<SubNavBarProps> = ({
  setActiveSection,
  activeSection,
}) => {
  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10 mb-10">
        <div className="flex justify-center bg-gray-200 p-4 rounded-md">
          <ul className="flex space-x-6">
            <li>
              <button
                onClick={() => setActiveSection("Safety Seminars")}
                className={`text-gray-800 md:text-base text-sm px-5 py-2 transition duration-300 focus:outline-none ${
                  activeSection === "Safety Seminars"
                    ? "bg-orange-500 rounded-md text-white font-medium"
                    : "hover:text-orange-500"
                }`}
              >
                Safety Seminars
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection("Car Maintenance Workshops")}
                className={`text-gray-800 md:text-base text-sm px-5 py-2 transition duration-300 focus:outline-none ${
                  activeSection === "Car Maintenance Workshops"
                    ? "bg-orange-500 rounded-md text-white font-medium"
                    : "hover:text-orange-500"
                }`}
              >
                Maintenance Workshops
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubNavBar;
