import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const submitHandle = (category) => {
    navigate(`/products?category=${category.title}`);
    setDropDown(false);
    window.location.reload();
  };
  const handleSubCategoryClick = (selectedSubCategory) => {
    navigate(`/products?category=${selectedCategory.title}&selectedSubCategory=${selectedSubCategory.title}`);
    setDropDown(false);
    // window.location.reload();
  };
  const handleTypeClick = (type) => {
    navigate(`/products?category=${selectedCategory.title}&subcategories=${selectedSubCategory.title}&types=${type}`);
    setDropDown(false);
    // window.location.reload();
  };
  const handleMouseEnterType = (Type) => {
    setSelectedType(Type);
  };

  const handleMouseLeaveType = () => {
    setSelectedType(null);
  };

  const handleMouseEnter = (category) => {
    setSelectedCategory(category);
  };

  const handleMouseLeave = () => {
    setSelectedCategory(null);
  };
  const handleMouseEntersubCategory = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleMouseLeavesubCategory = () => {
    setSelectedSubCategory(null);
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff]  absolute  z-30 rounded-b-md shadow-sm">
      {categoriesData &&
        categoriesData.map((category, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(category)}
            onMouseEnter={() => handleMouseEnter(category)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={category.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>
          </div>
        ))}
      {selectedCategory && (
        <div
          className="absolute top-0 left-[270px] w-[270px] bg-[#fff]  z-30 rounded-b-md shadow-sm cursor-pointer h-full"
          onMouseEnter={() => handleMouseEnter(selectedCategory)}
          onMouseLeave={handleMouseLeave}
        >
          <ul onClick={handleSubCategoryClick}>
            {selectedCategory.subcategories.map((subCategory, index) => (
              <li key={index}>{subCategory.title}</li>
            ))}
          </ul>
        </div>
      )}
      
      {selectedSubCategory && (
        <div
          className="absolute top-0 left-[270px] w-[270px] bg-blue-400 z-30 rounded-b-md shadow-sm cursor-pointer"
          onMouseEnter={() => handleMouseEntersubCategory(selectedSubCategory)}
          onMouseLeave={handleMouseLeavesubCategory}
        >
          <ul onClick={handleSubCategoryClick}>
            {selectedSubCategory.types.map((Type, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnterType(Type)}
                onMouseLeave={handleMouseLeaveType}
                onClick={() => handleTypeClick(Type)}
              >
                {Type.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;
