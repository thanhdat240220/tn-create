import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IScroll {
  scrollY: number;
}

export const ScrollObserverContext = createContext<IScroll>({ scrollY: 0 });

export const ScrollObserve: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollObserverContext.Provider value={{ scrollY }}>
      {children}
    </ScrollObserverContext.Provider>
  );
};
