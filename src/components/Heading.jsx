import React from "react";

const Heading = ({ headingText }) => {
  return (
    <h2 className="font-primary font-bold text-4xl text-primary mb-16 text-center">
      {headingText}
    </h2>
  );
};

export default Heading;
