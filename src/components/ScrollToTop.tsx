import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ILocation {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ILocation) => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

export default ScrollToTop;
