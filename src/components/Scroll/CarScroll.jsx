import { useEffect, useRef } from "react";
import "./CarScroll.css";
import { SimpleGreenCarTopView as Car } from "../../assets/js";

const CarScroll = () => {
  const roadRef = useRef(null);
  const carWrapperRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleScroll = () => {
      if (!roadRef.current || !carWrapperRef.current || !overlayRef.current)
        return;

      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const carWidth = carWrapperRef.current.offsetWidth;
      // Calculate max distance: Container width - car width - padding (16px) - stop line width/buffer (~20px)
      const maxDistance = roadRef.current.clientWidth - carWidth - 40;

      // Calculate position
      let position = (currentScroll / totalScroll) * maxDistance;

      // Clamp position
      if (position < 0) position = 0;
      if (position > maxDistance) position = maxDistance;

      // Update DOM directly for best performance
      carWrapperRef.current.style.transform = `translateX(${position}px)`;
      overlayRef.current.style.width = `calc(100% - ${position}px)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll);
    // Initial call to set position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="car__scroll">
      <div className="city__skyline" />
      <div className="road road__left" ref={roadRef}>
        <div className="car__wrapper" ref={carWrapperRef}>
          <div className="exhaust__fumes">
            <span className="fume fume-1"></span>
            <span className="fume fume-2"></span>
            <span className="fume fume-3"></span>
          </div>
          <Car className="car" />
        </div>
        <div className="car__stop__line" />
      </div>
      <div className="road__line" />
      <div className="road road__right">
        <div className="copyright__overlay" ref={overlayRef} />
        <small className="copyright">
          Pacride © {new Date().getFullYear()}. All rights reserved.
        </small>
      </div>
    </div>
  );
};

export default CarScroll;
