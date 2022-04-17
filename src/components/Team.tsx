import Image from "next/image";
import React from "react";

const Team: React.FC = () => {
  const members = [
    {
      image: "/assets/team/member1.svg",
      name: "Member 1",
    },
    {
      image: "/assets/team/member2.svg",
      name: "Member 2",
    },
    {
      image: "/assets/team/member3.svg",
      name: "Member 3",
    },
    {
      image: "/assets/team/member4.svg",
      name: "Member 4",
    },
    {
      image: "/assets/team/member5.svg",
      name: "Member 5",
    },
    {
      image: "/assets/team/member7.svg",
      name: "Member 6",
    },
    {
      image: "/assets/team/member8.svg",
      name: "Member 7",
    },
    {
      image: "/assets/team/member9.svg",
      name: "Member 8",
    },
    {
      image: "/assets/team/member10.svg",
      name: "Member 9",
    },
    {
      image: "/assets/team/member11.svg",
      name: "Member 10",
    },
  ];

  return (
    <>
      <div className="container mx-auto mt-28 px-11 text-center">
        <p className="text-4xl text-center pb-8">
          <span className="font-bold">Our Team</span>
          <br /> the “spec-ops”
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {members.map(({ image, name }, _) => {
            return (
              <>
                <div key={_}>
                  <Image
                    alt="member"
                    src={image}
                    width={511 / 3}
                    height={594 / 3}
                  />
                  <div className="text-2xl pb-2">{name}</div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Team;
