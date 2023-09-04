import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const About = () => {
  let [about, setAbout] = useState();
  let [aboutImage, setAboutImage] = useState();
  let [buttonArr, setButtonArr] = useState([]);
  useEffect(() => {
    async function getAbout() {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/abouts?populate=*`
      );
      setAbout(data.data.data[0].attributes);
      setAboutImage(data.data.data[0].attributes.aboutImg.data.attributes);
      setButtonArr(data.data.data[0].attributes.Button);
    }
    getAbout();
  }, []);
  return (
    <div className="max-w-container mx-auto flex justify-between items-center gap-x-16 mt-20">
      <div className="w-1/2">
        {about && (
          <>
            <h2 className="font-primary font-bold text-4xl text-primary mb-5">
              {about.heading}
            </h2>
            <p className="font-secondary font-normal text-primary text-base">
              {about.description}
            </p>
          </>
        )}
        <ul className="flex gap-x-8 mt-8">
          {buttonArr.map((item) => (
            <li key={item.id} className="group">
              <a
                href={item.ButtonUrl}
                className="font-secondary font-semibold text-base text-primary group-hover:text-white uppercase border group-hover:border-transparent border-borderColor px-6 py-2 group-hover:bg-primary duration-200"
              >
                {item.buttonText}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {aboutImage && (
        <div className="w-1/2">
          <img
            src={`${import.meta.env.VITE_BASE_URL}${aboutImage.url}`}
            alt={aboutImage.alternativeText}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default About;
