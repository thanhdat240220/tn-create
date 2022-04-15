import type { NextPage } from "next";
import { ScrollObserve } from "../src/hooks/observeScroll";
import Header from "../src/components/Header";
import Content from "../src/components/Content";

const Home: NextPage = () => {
  return (
    <>
      <ScrollObserve>
        <div className="relative">
          <Header />
          <Content />
        </div>
      </ScrollObserve>
    </>
  );
};

export default Home;
