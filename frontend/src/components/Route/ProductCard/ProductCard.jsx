import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  //display the days it has been running
  const calculateDaysSinceCreation = (createdDate) => {
    const currentDate = new Date();
    const createdAt = new Date(createdDate);
    const timeDifference = currentDate - createdAt;

    // Calculate days, hours, and minutes
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    } else {
      return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
    }
  };

  const handleShareProduct = () => {
    const productLink = `http://localhost:3000/product/${data._id}`; // Replace with your product link
    const shareMessage = `${productLink}`;

    const userShareInput = window.prompt('Share the product link:', shareMessage);

    if (userShareInput !== null) {
      // Handle user's response here (e.g., send the link to a server or perform other actions)
      console.log(`User shared: ${userShareInput}`);
    }
  };



  return (
    <>
      <div className="w-full h-[300px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">


        <div className="flex items-center">
          <Link to={`/shop/preview/${data?.shop._id}`} className="flex items-center">
            <img
              src={`${data.shop.avatar.url}`}
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <div className="ml-2">
              <h6 className={`${styles.shop_name}`}>{data.shop.name}</h6>
              <span className="text-[12px] text-gray-500 mb-8">
                {calculateDaysSinceCreation(data?.createdAt)}
              </span>
            </div>
          </Link>
        </div>


        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[100px] object-contain"
          />
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          {/* <div className="flex">
            <Ratings rating={data?.ratings} />
          </div> */}

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            {/* <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span> */}

          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={20}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={20}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShareAlt
            size={20}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => handleShareProduct(data._id)}
            color="#444"
            title="Share Product"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
