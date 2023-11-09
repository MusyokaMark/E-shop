import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(allProducts); 

  const filterProducts = (filterCriteria) => {
    // You can implement various filtering logic here based on filterCriteria
    // For example, filter by category, price, or any other criteria
    // Update the filteredProducts state with the filtered products
    setFilteredProducts(filteredProducts);
  };
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div>
          <p>Filter by:</p>
          {/* <button onClick={() => filterProducts("category1")}>Category 1</button>
          <button onClick={() => filterProducts("category2")}>Category 2</button> */}
          {/* Add more filter buttons as needed */}
        </div>
        {/* <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div> */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts &&
            allProducts.length !== 0 &&
            allProducts
              .filter((product) => product.originalPrice === product.discountPrice)
              .map((i, index) => <ProductCard data={i} key={index} />)}
        </div>

      </div>
    </div>
  );
};

export default FeaturedProduct;
