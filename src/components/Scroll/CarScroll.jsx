import { useState, useEffect, useRef } from "react";
import "./CarScroll.css";
import { SimpleGreenCarTopView as Car } from "../../assets/js";

const CarScroll = () => {
  const [scroll, setScroll] = useState(0);
  const roadRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      let newScroll = window.scrollY;
      const roadWidth = roadRef.current.clientWidth - 60;
      console.log({ newScroll, totalScroll });
      const relativeScroll = (newScroll / totalScroll) * roadWidth;
      console.log({ relativeScroll });
      setScroll(relativeScroll);
      if (relativeScroll < 0) setScroll(0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="car__scroll">
      <div className="road road__left" ref={roadRef}>
        <Car className="car" style={{ marginLeft: `${scroll}px` }} />
        <div className="car__stop__line" />
      </div>
      <div className="road__line" />
      <div className="road road__right">
        <small className="copyright">
          Pacride © 2021. All rights reserved.
        </small>
      </div>
    </div>
  );
};

export default CarScroll;
