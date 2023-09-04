import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import diamond from "../assets/diamond.png";

const Banner = () => {
  let [banner, setBanner] = useState();
  let [desigArr, setDesigArr] = useState([]);
  let [bannerBG, setBannerBG] = useState();
  let [bgUrl, setBgUrl] = useState("");
  let [socialArr, setSocialArr] = useState([]);
  useEffect(() => {
    async function getBanner() {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/banners?populate=*`
      );
      const social = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/banners?populate[social][populate]=*`
      );
      setBanner(data.data.data[0].attributes);
      setDesigArr(data.data.data[0].attributes.Designation);
      setBannerBG(data.data.data[0].attributes.bannerImg.data.attributes);
      setBgUrl(
        `${import.meta.env.VITE_BASE_URL}${
          data.data.data[0].attributes.bannerImg.data.attributes.url
        }`
      );
      setSocialArr(social.data.data[0].attributes.social);
    }
    getBanner();
  }, []);
  return (
    <>
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgUrl})`,
        }}
      >
        <div className="max-w-container mx-auto flex items-center h-screen">
          <div className="flex flex-col justify-center items-center gap-y-7">
            {banner && (
              <>
                <h3 className="text-white font-primary font-bold text-2xl">
                  {banner.Greeting}
                </h3>
                <h2 className="text-white font-primary font-bold text-7xl">
                  {banner.BannerTitle}
                </h2>
              </>
            )}
            <div className="flex items-center gap-x-3">
              {desigArr.map((item, index) => (
                <>
                  <span className="text-white font-secondary font-semibold text-sm uppercase">
                    {item.designations}
                  </span>
                  {index < desigArr.length - 1 && (
                    <img src={diamond} className="inline-block w-3 h-3" />
                  )}
                </>
              ))}
            </div>
          </div>
          <ul className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-x-6">
            {socialArr.map((item) => (
              <li key={item.id}>
                <a
                  href={item.socialIconUrl}
                  className="w-8 h-8 rounded-full bg-white flex justify-center items-center hover:-translate-y-1 duration-200"
                >
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}${
                      item.icon.data.attributes.url
                    }`}
                    alt={item.icon.data.attributes.alternativeText}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Banner;
