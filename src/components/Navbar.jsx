import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  let [logo, setLogo] = useState();
  let [menu, setMenu] = useState([]);
  let [btn, setBtn] = useState([]);
  useEffect(() => {
    async function getNav() {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/navbars?populate=*`
      );
      setLogo(data.data.data[0].attributes.logo.data.attributes);
      setMenu(data.data.data[0].attributes.navMenuItem);
      setBtn(data.data.data[0].attributes.navButton);
    }
    getNav();
  }, []);

  return (
    <div className="bg-transparent absolute w-full">
      <div className="max-w-container mx-auto flex justify-between items-center h-20">
        <div>
          {logo && (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${logo.url}`}
              alt={logo.alternativeText}
            />
          )}
        </div>
        <div className="flex items-center gap-x-7">
          <ul className="flex gap-x-7">
            {menu.map((item) => (
              <li key={item.id} className="relative group">
                <a
                  href={item.url}
                  className="font-secondary text-base text-white uppercase"
                >
                  {item.menuItem}
                </a>
                <span className="bg-white w-0 group-hover:w-[21px] duration-300 h-[1px] absolute bottom-[-5px] left-0"></span>
              </li>
            ))}
          </ul>
          {btn.map((item) => (
            <a
              href={item.ButtonUrl}
              className="font-secondary text-base uppercase text-white border border-white hover:bg-white hover:text-primary duration-300 px-8 py-2"
            >
              {item.buttonText}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
