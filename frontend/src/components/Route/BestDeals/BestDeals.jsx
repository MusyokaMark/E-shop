import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";


// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    
    // Filter products where originalPrice is different from discountPrice
    const filteredData = allProductsData.filter((product) => product.originalPrice !== product.discountPrice);

    // Sort the filtered data by 'sold_out' or any other criteria you prefer
    const sortedData = filteredData.sort((a, b) => b.sold_out - a.sold_out);

    // Take the first five products
    const firstTen = sortedData.slice(0, 7);

    setData(firstTen);
  }, [allProducts]);
  
  return (
    
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Slashed Prices</h1>
        </div>
        
        {/* <Carousel responsive={responsive} containerClass={`w-full`}> */}
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
      </div>
    </div>
    
  );
};

export default BestDeals;
