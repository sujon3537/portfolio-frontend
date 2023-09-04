import { useState } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import About from "./components/About";
import Skill from "./components/Skill";
import Service from "./components/Service";
import Project from "./components/Project";
import Testimonial from "./components/Testimonial";
import Blog from "./components/Blog";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Skill />
      <Service />
      <Testimonial />
      <Blog />
    </>
  );
}

export default App;
