import React, { useState } from "react";
import MobileCarousel from "/assets/MobileCarousel.webp";
import LaptopCarousel from "/assets/LaptopCarousel.webp";
import FashionCarousel from "/assets/FashionCarousel.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        right: "10px",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        left: "10px",
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
}

const slides = [
  {
    image: MobileCarousel,
    text: "Best Mobile Deals - Up to 50% Off!",
  },
  {
    image: LaptopCarousel,
    text: "Top Laptops - Special Offers Inside!",
  },
  {
    image: FashionCarousel,
    text: "Trendy Fashion - New Collection Out Now!",
  },
];

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div style={{ position: "relative" }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={slide.image}
              alt=""
              style={{ width: "100%" }}
            />

            {currentSlide === index && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "55%",
                  marginLeft: "20px",
                  transform: "translate(-50%, -50%)",
                  color: "InfoText",
                  padding: "10px 20px",
                  fontSize: "clamp(1rem, 4vw, 2rem)",
                  fontWeight: "bold",
                  textAlign: "center",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                  lineHeight: "1.4",
                }}
              >
                {slide.text}
              </motion.div>
            )}
          </div>
        ))}
      </Slider>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "40%",
          background:
            "linear-gradient(to top, rgba(243, 244, 246, 1), transparent)",
          zIndex: "10",
        }}
      ></div>
    </div>
  );
};

export default BannerCarousel;
