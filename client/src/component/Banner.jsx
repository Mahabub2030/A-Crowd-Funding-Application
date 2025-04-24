import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Banner = () => {
  const slides = [
    {
      image: "https://c3.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto/ud1kjan3j77zevizkfjv.png",
      title: "Alien Horde: Filming Complete!",
      subtitle: "Help Fund the Final Edits",
    },
    {
      image: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1920/x3fxsvnwripmnlp0o1ol.png",
      title: "Crowdfund Your Next Big Idea",
      subtitle: "Join millions to make dreams come true",
    },
    {
      image: "https://c0.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto,w_1920/wt32nyyxujldgp7fixdj.jpg",
      title: "Explore Tech Innovations",
      subtitle: "Discover the future, today",
    },
  ];

  return (
    <div className="mt-15">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000, // Delay before changing slides
          disableOnInteraction: false, // Autoplay continues even after interaction
        }}
        speed={1000} // Transition speed
        loop
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "800px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
                <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-base">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
