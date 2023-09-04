import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sliderdot from "./Sliderdot";

const Testimonial = () => {
  let [testimonial, setTestimonial] = useState();
  let [quoteIcon, setQuoteIcon] = useState();
  let [testimonyArr, setTestimonyArr] = useState([]);
  useEffect(() => {
    async function getTestimonial() {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/testimonials?populate=*`
      );
      setTestimonial(data.data.data[0].attributes);
      setQuoteIcon(data.data.data[0].attributes.icon.data.attributes.url);
      setTestimonyArr(data.data.data[0].attributes.testimonials);
    }
    getTestimonial();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => <ul>{dots}</ul>,
    dotsClass: "flex gap-x-2 absolute left-1/2 bottom-20 -translate-x-1/2",
    customPaging: (i) => <Sliderdot />,
  };

  return (
    <div className="max-w-container mx-auto mt-20 relative">
      <Slider {...settings}>
        {testimonyArr.map((item) => (
          <div className="w-full h-[430px] bg-bgColor text-center py-20">
            <div className="w-8 h-8 rounded-full border border-primary flex justify-center items-center mx-auto">
              <img src={`${import.meta.env.VITE_BASE_URL}${quoteIcon}`} />
            </div>
            {testimonial && (
              <h2 className="mt-4 mb-10 font-primary font-medium text-lg text-primary uppercase">
                {testimonial.title}
              </h2>
            )}

            <div className="max-w-[300] h-[400px] text-center">
              <p className="font-secondary font-light text-xl text-primary w-[916px] mx-auto">
                {item.testimony}
              </p>
              <span className="mt-8 inline-block font-secondary font-normal uppercase text-base text-[#444444]">
                - {item.name_designation}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;
