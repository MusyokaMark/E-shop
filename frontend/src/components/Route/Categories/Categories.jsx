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
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";


const Categories = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setPopupOpen] = useState(false);

  // Remove the shuffle function to display all categories
  const allCategories = categoriesData;

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  const [openCategory, setOpenCategory] = useState(null);

  const toggleSubcategories = (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryId);
    }
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
      <div className="p-16  py-px flex justify-between">
        <h2 className="">What would you like to find?</h2>
        <div className="flex items-center">
          <button className="pointer" onClick={togglePopup}>View All</button>
          <BiCategoryAlt size={20} className="" onClick={togglePopup} />
        </div>
        {isPopupOpen && (
          <div className={`fixed top-0 ${
            // For small screens (md: medium, lg: large, xl: extra large)
            "md:right-0 md:w-2/5 lg:w-1/2 xl:w-2/5 md:h-full"
            } flex items-center justify-center z-50 bg-black bg-opacity-50`}>
            <div className="bg-white p-4 rounded shadow-lg w-full h-full">
              <div className="flex bg-green-700">
                <h3 className="absolute top-2 left-2">All Categories</h3>
                <button className="absolute top-2 right-2 text-gray-500" onClick={closePopup}>
                  <AiOutlineClose size={20} className="text-black-700" />
                </button>
              </div>
              <br />
              <div>
                <ul className="space-y-2 pl-4 max-h-screen overflow-y-auto">
                  {categoriesData.map((category) => (
                    <li key={category.id}>
                      <div className="flex items-center border-2">
                        <span>{category.title}</span>
                        <button
                          onClick={() => toggleSubcategories(category.id)}
                          className="ml-2 text-gray-500 focus:outline-none"
                        >
                          {openCategory === category.id ? '▼' : '►'}
                        </button>
                      </div>
                      {openCategory === category.id && (
                        <ul className="cursor-pointer"  >
                          {category.subcategories.map((subcategory) => (
                            <li key={subcategory.id}>{subcategory.title}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        )}
      </div>

      <div
        className={`${styles.section} bg-gray-100 p-6 rounded-lg mb-12 overflow-x-auto`}
        id="categories"
      >
        <div className="flex space-x-4">
          {allCategories &&
            allCategories.map((i) => {
              const handleSubmit = () => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-[150px] flex flex-col items-center cursor-pointer"
                  key={i.id}
                  onClick={handleSubmit}
                >
                  <div className="bg-gray-200 w-[150px] h-[150px] flex items-center justify-center rounded-md">
                    <div className="flex flex-col items-center text-center">
                      <img
                        src={i.image_Url}
                        className="w-[60px] h-[60px] object-cover"
                        alt=""
                      />
                      <h5 className="text-[14px] leading-[1.3] mt-2 overflow-hidden whitespace-nowrap max-w-[200px] truncate">
                        {i.title.length > 15 ? `${i.title.slice(0, 15)}...` : i.title}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

    </>
  );
};

export default Categories;

