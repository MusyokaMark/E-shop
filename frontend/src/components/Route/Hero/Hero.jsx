import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import backgroundImage from "../../../img/background.jpg";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[50vh] 800px:min-h-[60vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
        `url(${backgroundImage})`,
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        {/* <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> all our Customers
        </h1> */}
        
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Explore
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
