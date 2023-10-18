"use client";

import { useState } from "react";
import CarMaintenanceWorkshop from "./CarMaintenanceWorkshop";
import SafetySeminar from "./Safety Seminar";
import SubNavBar from "./SubNavbar";

const Events = () => {
  const [activeSection, setActiveSection] = useState("Safety Seminars");

  return (
    <div>
      <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
        <h1 className="text-center text-4xl font-semibold text-orange-600 mt-5 hover:text-5xl transition-all ease-in duration-300">
         # Events
        </h1>
      </div>
      <SubNavBar
        setActiveSection={setActiveSection}
        activeSection={activeSection}
      />
      {activeSection === "Safety Seminars" ? (
        <SafetySeminar />
      ) : (
        <CarMaintenanceWorkshop />
      )}
    </div>
  );
};

export default Events;
