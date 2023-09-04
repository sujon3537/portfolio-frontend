import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Heading";

const Service = () => {
  let [service, setService] = useState();
  let [serviceArr, setServiceArr] = useState([]);
  useEffect(() => {
    async function getService() {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/services?populate[services][populate]=*`
      );
      setService(data.data.data[0].attributes);
      setServiceArr(data.data.data[0].attributes.services);
    }
    getService();
  }, []);
  return (
    <div className="bg-bgColor py-20 mt-20">
      <div className="max-w-container mx-auto">
        {service && <Heading headingText={service.heading} />}
        <div className="flex justify-between flex-wrap gap-[30px]">
          {serviceArr.map((item) => (
            <div
              key={item.id}
              className="w-[350px] h-[300px] bg-white flex flex-col justify-center items-center gap-[30px] px-6 hover:drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] hover:-translate-y-[10px] ease-out duration-300"
            >
              <div className="w-[45px]">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${
                    item.icon.data.attributes.url
                  }`}
                  alt={item.icon.data.attributes.alternativeText}
                  className="mx-auto"
                />
              </div>
              <h3 className="font-primary font-medium text-lg uppercase text-primary">
                {item.title}
              </h3>
              <p className="font-secondary font-normal text-base text-secondary text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
