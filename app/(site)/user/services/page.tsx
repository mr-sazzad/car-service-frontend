"use client"

import Loading from "@/app/loading";
import { useGetAllServicesQuery } from "@/app/redux/api/services/serviceApi";
import SingleServiceCard from "@/components/SingleServiceCard";
import { Slider } from "antd";
import { useState } from "react";

const Services = () => {
  const { data: services, isLoading } = useGetAllServicesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [disabled, setDisabled] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const filteredServices = services?.filter(
    (item: any) =>
      item.price >= priceRange[0] &&
      item.price <= priceRange[1] &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onPriceRangeChange = (value: any) => {
    setPriceRange(value);
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-col lg:flex-row gap-3 mx-4 md:mx-8 lg:mx-10">
        <div className="w-full lg:w-[250px] bg-gray-100 rounded-md">
          <div className="flex flex-col gap-5 px-3">
            <div>
              <p className="mb-5 font-medium text-lg text-center text-gray-600 mt-5">
                Search and Filter
              </p>
              <input
                className="border border-gray-300 outline-none p-1 rounded-md w-full mb-5"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <p className="text-center text-xl font-medium text-gray-600">Filter By Price</p>
              <Slider
                range
                min={0}
                max={500}
                defaultValue={[0, 500]}
                disabled={disabled}
                onChange={onPriceRangeChange}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-100 rounded-md p-5 flex flex-col lg:flex-row gap-4">
          {filteredServices?.map((item: any) => (
            <SingleServiceCard service={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
