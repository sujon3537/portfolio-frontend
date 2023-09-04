import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Heading from "./Heading";

const Project = () => {
  useEffect(() => {
    async function getProject() {
      const data = await axios.get();
    }
  }, []);
  return (
    <div className="max-w-container mx-auto">
      <h3>prj</h3>
    </div>
  );
};

export default Project;
