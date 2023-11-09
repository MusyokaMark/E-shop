import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../styles/styles";
import backgroundImage1 from "../../../img/Banner.webp";
import backgroundImage2 from "../../../img/Banner.webp";
import backgroundImage3 from "../../../img/Banner.webp";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Default value for larger screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // Adjust the speed as needed
  };

  // Adjust the settings for small screens
  if (window.innerWidth <= 768) { // Adjust this breakpoint as needed
    settings.slidesToShow = 1;
  }

  return (
    <div className={` mt-4 relative min-h-[30vh] 800px:min-h-[30vh] m-2 w-full bg-no-repeat ${styles.normalFlex}`}>
      <Slider {...settings}>
        <div>
          <div className="pr-2 pl-2">
            <img src={backgroundImage1} alt="Banner 1" />
          </div>
        </div>
        <div>
          <div className="pl-2 pr-2">
            <img src={backgroundImage2} alt="Banner 2" />
          </div>
        </div>
        <div>
          <div className="pr-2 pl-2">
            <img src={backgroundImage3} alt="Banner 3" />
          </div>
        </div>
        {/* Add more images as needed */}
      </Slider>
    </div>
  );
};

export default Hero;
