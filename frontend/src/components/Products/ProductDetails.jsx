import React, { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlineVerticalLeft,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import axios from "axios";
import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';

const ProductDetails = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showContact, setShowContact] = useState(false);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');


  const handlePhoneButtonClick = () => {
    setShowPhoneForm(true);
  };

  const handlePhoneFormSubmit = (e) => {
    e.preventDefault();
    // Handle the phone number submission here, e.g., send it to a server
    //alert(`Phone number submitted: ${phoneNumber}`);
    setShowPhoneForm(false);
  };


  const handlePhone = () => {
    if (isAuthenticated) {
      setShowContact(true);
    }
  };
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);


  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  return (

    <div className="bg-white">
      
      {data ? (
        
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className=' py-5 mb-5'>
        <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
          <div className='flex justify-start items-center text-md text-slate-600 w-full'>
            <Link to='/'>Home</Link>
            <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
            <Link to='/'>{data.category}</Link>
            <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
            <Link to='/'>{data.subcategory}</Link>
            <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
            <span>{data.name}</span>
          </div>
        </div>
      </div>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data && data.images[select]?.url}`}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${select === 0 ? "border" : "null"
                          } cursor-pointer`}
                      >
                        <img
                          src={`${i?.url}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                          onClick={() => setSelect(index)}
                        />
                      </div>
                    ))}
                  <div
                    className={`${select === 1 ? "border" : "null"
                      } cursor-pointer`}
                  ></div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                
              
                <p>Condition:  <span className="text-green-500">{data.condition}</span></p>
                <p>Brand: <span className="text-green-500">{data.brand}</span></p>
                <p>Product type:  <span className="text-green-500">{data.productType}</span></p>
                <p>Delivery  method: <span className="text-green-500">{data.delivery_method}</span></p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>


                <div className='flex py-5 gap-5'>
                  <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                    <span>Availability</span>
                    <span>Share on</span>
                  </div>
                  <div className='flex flex-col gap-5'>
                    <span className={`text-${data.stock ? 'green' : 'red'}-500`}>
                      {data.stock ? `In Stock(${data.stock})` : 'Out of Stock'}
                    </span>
                    <ul className='flex justify-start items-center gap-3'>
                      <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href="#"><FaFacebookF /></a>
                      </li>
                      <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href="#"><AiOutlineTwitter /></a>
                      </li>
                      <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white' href="#"><FaLinkedin /></a>
                      </li>
                      <li>
                        <a className='w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#"><AiFillGithub /></a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center pt-8">
                  {/* <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${data?.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="pb-3 text-[15px]">
                      ({averageRating}/5) Ratings
                    </h5>
                  </div> */}
                  <div
                    className={`${styles.button} bg-[#faf9fc] mt-4 mr-4 !rounded !h-11 border border-gray-300`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-black flex items-center">
                      Chat Seller<AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <div>
                    {isAuthenticated ? (
                      <div
                        className={`${styles.button} bg-[#2cb058] mt-4 mr-4 !rounded !h-11 border border-gray-300`}
                        onClick={handlePhone}
                      >
                        <span className="text-white flex items-center bg-[#2cb058]">
                          {data.shop?.
                            phoneNumber}<AiOutlineVerticalLeft className="ml-1" />
                        </span>
                      </div>
                    ) : (
                      <div
                        className={`${styles.button} text-black mt-4 mr-4 !rounded !h-11 border border-gray-300`}

                      >
                        <span className="text-black">
                          view contact
                        </span>
                      </div>
                    )}

                    {/* Rest of your code */}
                  </div>

                </div>
                <div className="w-full flex">
                  <div>
                    {!showPhoneForm ? (
                      <div
                        className={`${styles.button} bg-[#faf9fc] mt-4 mr-4 !rounded !h-11 border border-gray-300`}
                        onClick={handleMessageSubmit}
                      >
                        <span className="text-black flex items-center">
                          Request call back
                        </span>
                      </div>
                    ) : (
                      <form onSubmit={handlePhoneFormSubmit} className="block">
                        <label htmlFor="phoneNumber" className="b-2">Enter your phone number:</label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          placeholder="e.g., 071-456-7890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                      </form>
                    )}

                    {/* Rest of your code */}
                  </div>

                </div>

              </div>
            </div>
          </div>
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
          
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={`/shop/preview/${data.shop._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.shop?.avatar?.url}`}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">{data.shop.description}</p>
          </div>

          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:{" "}
                <span className="font-[500]">
                  {data.shop?.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{" "}
                <span className="font-[500]">
                  {products && products.length}
                </span>
              </h5>
              <h6 className="font-[600] pt-3">
                Phone Number:{" "}
                <span className="font-[500]">
                  {data.shop?.
                    phoneNumber}
                </span>
              </h6>
              <h6 className="font-[600] pt-3">
                Email:{" "}
                <span className="font-[500]">
                  <a href={`mailto:${data.shop?.email}`} >
                    {data.shop?.email}
                  </a>
                </span>
              </h6>
              <h5 className="font-[600] pt-3">
                Total Reviews:{" "}
                <span className="font-[500]">{totalReviewsLength}</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
