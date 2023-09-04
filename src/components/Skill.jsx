import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Heading";

const Skill = () => {
  let [skill, setSkill] = useState();
  let [skillArr, setSkillArr] = useState([]);
  useEffect(() => {
    async function getSkill() {
      const data = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/skills?populate[skills][populate]=*`
      );
      setSkill(data.data.data[0].attributes);
      setSkillArr(data.data.data[0].attributes.skills);
    }
    getSkill();
  }, []);
  return (
    <div className="max-w-container mx-auto mt-20">
      {skill && <Heading headingText={skill.heading} />}
      <div className="flex justify-between flex-wrap gap-[30px]">
        {skillArr.map((item) => (
          <div className="w-[200px] h-[200px] bg-bgColor flex flex-col items-center justify-center gap-6 hover:drop-shadow-[0_25px_45px_rgba(0,0,0,0.15)] hover:-translate-y-[10px] ease-out duration-300">
            <div className="w-[60px] h-[60px]">
              <img
                src={`${import.meta.env.VITE_BASE_URL}${
                  item.icon.data.attributes.url
                }`}
                alt={item.icon.data.attributes.alternativeText}
                className="mx-auto"
              />
            </div>
            <span className="font-secondary font-normal uppercase text-xl text-primary">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
