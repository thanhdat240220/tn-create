import Image from "next/image";
import React, { useCallback, useContext, useRef, useState } from "react";
import { ScrollObserverContext } from "../hooks/observeScroll";

const Header: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollY } = useContext(ScrollObserverContext);
  const ContentRef = useRef<HTMLDivElement>(null);
  let process = 0;

  if (ContentRef.current) {
    process = Math.min(1, scrollY / ContentRef.current.clientHeight);
  }

  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <>
      <div
        ref={ContentRef}
        className="min-h-screen flex flex-col items-center justify-center sticky top-0 -z-10"
        style={{
          transform: `translateY(-${process * 20}vh)`,
        }}
      >
        <video
          autoPlay
          playsInline
          muted
          loop
          className="w-full h-full absolute object-cover"
        >
          <source
            src={"/assets/masthead-bg.webm"}
            type={"video/webm; codecs=vp9"}
          />
        </video>
        <div className="flex justify-center flex-col flex-1 relative z-10 drop-shadow-[0_5px_3px_#1818187e] text-white">
          <h1 className={`font-medium text-3xl xl:text-5xl text-center pb-4`}>
            Welcome
          </h1>
          <h3 className="font-medium xl:text-2xl text-center">
            Hello, I am a Developer. <br />
            This is website for my profile
          </h3>
        </div>
        <div
          className={`flex-grow-0 pb-10 transition-all duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0 -translate-y-10"
          }`}
        >
          <Image
            layout="fixed"
            alt="drop_img"
            src={"/assets/dropdown.png"}
            width={188 / 3}
            height={104 / 3}
            onLoadingComplete={handleImageLoaded}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
