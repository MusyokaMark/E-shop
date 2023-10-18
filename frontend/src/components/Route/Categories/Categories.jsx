// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
// import styles from "../../../styles/styles";


// // import Slider from 'react-slick';
// // import 'slick-carousel/slick/slick.css';
// // import 'slick-carousel/slick/slick-theme.css';

// const Categories = () => {

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3, // Adjust the number of visible slides
//     slidesToScroll: 1,
//     autoplay: true, // Enable autoplay if desired
//     autoplaySpeed: 3000, // Set the autoplay speed (in milliseconds)
//   };
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div
//           className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
//         >
//           {brandingData &&
//             brandingData.map((i, index) => (
//               <div className="flex items-start" key={index}>
//                 {i.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
//                   <p className="text-xs md:text-sm">{i.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div
//         className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
//         id="categories"
//       >
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//           {categoriesData &&
//             categoriesData.map((i) => {
//               const handleSubmit = (i) => {
//                 navigate(`/products?category=${i.title}`);
//               };
//               return (
//                 // <Slider {...settings}>
//                 <div
//                   className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
//                   key={i.id}
//                   onClick={() => handleSubmit(i)}
//                 >

//                   <h5 className={`text-[17px] leading-[1.3]`}>{i.title}</h5>
//                   <img
//                     src={i.image_Url}
//                     className="w-[120px] object-cover"
//                     alt=""
//                   />
//                 </div>
//                 // </Slider>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  const [randomCategories, setRandomCategories] = useState([]);

  useEffect(() => {
    // Shuffle the categoriesData array to get a random order
    const shuffledCategories = shuffleArray(categoriesData);
    // Get the first 6 categories from the shuffled array
    const randomCategories = shuffledCategories.slice(0, 5);
    setRandomCategories(randomCategories);
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="p-12 py-px">
      <h2 className="">What would you like to find?</h2>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {randomCategories &&
            randomCategories.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                
                <div className="w-full h-[100px] flex flex-col items-center cursor-pointer overflow-hidden" key={i.id} onClick={() => handleSubmit(i)}>
                  <img src={i.image_Url} className="w-[60px] h-[60px] object-cover" alt="" />
                  <h5 className={`text-[14px] leading-[1.3] overflow-hidden whitespace-nowrap max-w-[200px] truncate`}>
                    {/* {i.title} */}
                    {i.title.length > 15 ? `${i.title.slice(0, 15)}...` : i.title}
                  </h5>
                </div>
               
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
