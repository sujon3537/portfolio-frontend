import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Heading";
import avatar from "../assets/avatar.png";
import calendar from "../assets/calendar.png";

const Blog = () => {
  let [blog, setBlog] = useState();
  let [blogArr, setBlogArr] = useState([]);
  useEffect(() => {
    async function getBlog() {
      const data = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/blogs?populate[blogs][populate]=*`
      );
      setBlog(data.data.data[0].attributes);
      setBlogArr(data.data.data[0].attributes.blogs);
    }
    getBlog();
  }, []);
  return (
    <div className="bg-bgColor mt-20 py-20">
      <div className="max-w-container mx-auto">
        {blog && <Heading headingText={blog.heading} />}
        <div className="flex justify-between gap-x-[30px]">
          {blogArr.map((item) => (
            <div className="w-[360px] h-[470px]">
              <div className="w-full h-[230px]">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${
                    item.blogImage.data.attributes.formats.thumbnail.url
                  }`}
                  alt={item.blogImage.data.attributes.alternativeText}
                  className="w-full h-full"
                />
              </div>
              <div className="bg-white p-6">
                <div className="flex items-center">
                  <div className="w-[12px] h-[12px]">
                    <img src={avatar} alt="avatar" className="w-full h-full" />
                  </div>
                  <span className="font-secondary font-normal text-base text-secondary ml-[10px] mr-6">
                    {item.author}
                  </span>
                  <div className="w-[12px] h-[12px] mr-[10px]">
                    <img
                      src={calendar}
                      alt="calendar"
                      className="w-full h-full"
                    />
                  </div>
                  <span className="font-secondary font-normal text-base text-primary">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-secondary font-medium text-lg text-secondary my-3">
                  {item.title}
                </h3>
                <p className="font-secondary font-normal text-base text-secondary">
                  {item.excerpt}..
                </p>
                <a
                  href={item.button.ButtonUrl}
                  className="font-secondary font-bold text-base text-primary hover:text-white uppercase border border-black hover:bg-primary duration-200 px-6 py-2 mt-3 inline-block"
                >
                  {item.button.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
