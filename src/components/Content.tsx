import React from "react";
import Team from "./Team";

const Content: React.FC = () => {
  return (
    <>
      <div className="bg-white pt-20 pb-24">
        <div className="container mx-auto px-10">
          <div className="text-4xl mx-auto max-w-5xl">
            <span className="font-bold">
              We will help you ship better apps, faster.
            </span>{" "}
            Our team of expert engineers has created the best user experiences
            in some of the most popular apps worldwide.
          </div>
        </div>
        <Team />
      </div>
    </>
  );
};

export default Content;
