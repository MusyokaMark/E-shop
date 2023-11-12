import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData, conditionData, deliveryMethod, productData } from "../../static/data";
import { counties } from "../../static/counties-constituencies";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(""); // New state for subcategory
  const [tags, setTags] = useState("");
  const [specialSpecs, setSpecialSpecs] = useState("");
  const [color, setColor] = useState([]);
  const [material, setMaterial] = useState("");
  const [pattern, setPattern] = useState("");
  const [sizes, setSizes] = useState("");
  const [styles, setStyles] = useState("");
  const [productType, setProductType] = useState("Retail");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery_method, setDelivery_method] = useState();
  const [county, setCounty] = useState();
  const [location, setLocation] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    const formattedSpecs = formatSpecialSpecs();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subcategory", subcategory); // Include subcategory in form data
    newForm.append("tags", tags);
    newForm.append("specialSpecs", formattedSpecs.outerHTML);
    newForm.append("condition", condition);
    newForm.append("type", type);
    newForm.append("brand", brand);
    newForm.append("color", color);
    newForm.append("pattern", pattern);
    newForm.append("sizes", sizes);
    newForm.append("styles", styles);
    newForm.append("material", material);
    newForm.append("delivery_method", delivery_method);
    newForm.append("county", county);
    newForm.append("location", location);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        subcategory,
        tags,
        specialSpecs: formattedSpecs.outerHTML,
        productType,
        type,
        brand,
        color,
        material,
        pattern,
        sizes,
        styles,
        condition,
        delivery_method,
        county,
        location,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
  };

  const formatSpecialSpecs = () => {
    // Split the special specs by new lines
    const specsArray = specialSpecs.split('\n').filter(spec => spec.trim() !== '');

    // Format the special specs into bullet points
    const formattedSpecs = specsArray.map((spec, index) => (
      <li key={index}>{spec}</li>
    ));

    return <ul>{formattedSpecs}</ul>;
  };


  // Filter subcategories based on the selected category
  const subcategoriesData = categoriesData.find((cat) => cat.title === category)?.subcategories || [];
  const colorOption = categoriesData.find((cat) => cat.title === category)?.colors || [];
  const materialData = categoriesData.find((cat) => cat.title === category)?.materials || [];
  const patternData = categoriesData.find((cat) => cat.title === category)?.pattern || [];
  const sizesData = categoriesData.find((cat) => cat.title === category)?.sizes || [];
  const stylesData = categoriesData.find((cat) => cat.title === category)?.styles || [];
  const brandData = categoriesData.find((cat) => cat.title === category)?.brand || [];
  const typeData = subcategoriesData.find((subcat) => subcat.title === subcategory)?.Type || [];
  const locationData = counties.find((countyItem) => countyItem.title === county)?.location || [];



  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };
  //special Specifications onChange handler
  const handleSpecialSpecsChange = (e) => {
    setSpecialSpecs(e.target.value);
  }
  const handleColorChange = (selectedColors) => {
    setColor(selectedColors);
  };

  return (
    <div className="w-[100%] 800px:w-[100%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />

        {/* common field */}
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>

        <br />
        <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
          <div className="w-[45%]">
            <label className="pb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[40px] rounded-[5px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose a category" className="font-bold">Choose a category</option>
              {categoriesData &&
                categoriesData.map((i) => (
                  <option value={i.title} key={i.title}>
                    {i.title}
                  </option>
                ))}
            </select>
          </div>
          <br />


          {/* Subcategory Dropdown */}
          {category !== "Choose a category" && (
            <div className="w-[45%]">
              <label className="pb-2">Subcategory</label>
              <select
                className="w-full mt-2 border h-[40px] rounded-[5px]"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="" className="font-bold">Choose a subcategory</option>
                {subcategoriesData.map((subcategory) => (
                  <option value={subcategory.title} key={subcategory.title}>
                    {subcategory.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <br />
        {category === "Fashion" && (
          <>
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
              {subcategory !== "Select a type" && (
                <div className="w-[45%]">
                  <label className="pb-2">Type</label>
                  <select
                    className="w-full mt-2 border h-[40px] rounded-[5px]"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="" className="font-bold">Select  type</option>
                    {typeData.map((Type) => (
                      <option value={Type.title} key={Type.title}>
                        {Type.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {category !== "Choose a brand" && (
                <div className="w-[45%]">
                  <label className="pb-2">Brand</label>
                  <select
                    className="w-full mt-2 border h-[40px] rounded-[5px]"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="" className="font-bold">Select  brand</option>
                    {brandData.map((brand) => (
                      <option value={brand.title} key={brand.title}>
                        {brand.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <br />
            {/* Color Selection */}
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
            {category !== "Choose a category" && (
              <div className="w-[45%]">
                <label className="pb-2">
                  Colors
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="" className="font-bold">color</option>
                  {colorOption.map((colors) => (
                    <option value={colors} key={colors}>
                      {colors}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {category !== "Choose a category" && (
              <div className="w-[45%]">
                <label className="pb-2">
                  Material
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                >
                  <option value="" className="font-bold">Material:</option>
                  {materialData.map((materials) => (
                    <option value={materials} key={materials}>
                      {materials}
                    </option>
                  ))}
                </select>
              </div>
            )}
            </div>
            <br />

            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
            {category !== "Choose a category" && (
              <div className="w-[45%]">
                <label className="pb-2">
                  Pattern
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                >
                  <option value="" className="font-bold">Choose a pattern</option>
                  {patternData.map((pattern) => (
                    <option value={pattern} key={pattern}>
                      {pattern}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {category !== "Choose a category" && (
              <div className="w-[45%]">
                <label className="pb-2">
                  Sizes
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                >
                  <option value="" className="font-bold">Select a Size</option>
                  {sizesData.map((sizes) => (
                    <option value={sizes} key={sizes}>
                      {sizes}
                    </option>
                  ))}
                </select>
              </div>
            )}
            </div>
            <br />
            {category !== "Choose a category" && (
              <div className="w-full">
                <label className="pb-2">
                  Style
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={styles}
                  onChange={(e) => setStyles(e.target.value)}
                >
                  <option value="" className="font-bold">Select a Style for product</option>
                  {stylesData.map((styles) => (
                    <option value={styles} key={styles}>
                      {styles}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <br />
            
            <div>
              <label className="pb-2">Special Specifications</label>
              <textarea
                cols="30"
                rows="8"
                type="text"
                value={specialSpecs}
                onChange={handleSpecialSpecsChange}
                className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter special specifications in a bullet point format..."
              ></textarea>
              {/* <small>Use bullet points (e.g., - Point 1)</small> */}
            </div>

            {/* Rest of the form */}
            <br />
            <div className="flex justify-between">
              <div>
                <label className="pb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={tags}
                  className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Enter your product tags..."
                />
              </div>

            </div>
            <br />
            <div>
              <label className="pb-2">
                Seller Type <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <div className="pr-3">
                  <input
                    type="radio"
                    id="retail"
                    name="productType"
                    value="Retail"
                    checked={productType === "Retail"}
                    onChange={handleProductTypeChange}
                  />
                  <label htmlFor="retail" className="pl-1">Retail</label>
                </div>
                <div className="pr-3">
                  <input
                    type="radio"
                    id="wholesale"
                    name="productType"
                    value="Wholesale"
                    checked={productType === "Wholesale"}
                    onChange={handleProductTypeChange}
                  />
                  <label htmlFor="wholesale" className="pl-1">Wholesale</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="all"
                    name="productType"
                    value="All"
                    checked={productType === "All"}
                    onChange={handleProductTypeChange}
                  />
                  <label htmlFor="all" className="pl-1">All</label>
                </div>
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Condition <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[40px] rounded-[5px]"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Choose a category">Choose a condition of product</option>
                {conditionData &&
                  conditionData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Delivery Method <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[40px] rounded-[5px]"
                value={delivery_method}
                onChange={(e) => setDelivery_method(e.target.value)}
              >
                <option value="Choose a category">Choose delivery Method</option>
                {deliveryMethod &&
                  deliveryMethod.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <br />

            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter your product stock..."
              />
            </div>
            <br />
          </>
        )}
        {productData.categoriesData === "Jobs" && (
          <>

            <input type="text" name="color" value={productData.color} />
            <input type="text" name="material" value={productData.material} />

          </>
        )}
        <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
          <div className="w-[45%]">
            <label className="pb-2">
              Product Location <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[40px] rounded-[5px]"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            >
              <option value="Choose a county">County</option>
              {counties &&
                counties.map((county) => (
                  <option value={county.name} key={county.name}>
                    {county.name}
                  </option>
                ))}
            </select>
          </div>
          <br />


          {/* Subcategory Dropdown */}
          {county !== "Choose a constituency" && (
            <div className="w-[45%]">
              <label className="pb-2">Local Location</label>
              <select
                className="w-full mt-2 border h-[40px] rounded-[5px]"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Choose a constituency</option>
                {locationData.map((location) => (
                  <option value={location.name} key={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="5"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          ></textarea>
        </div>
        <br />
        <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
          <div className="w-[45%]">
            <label className="pb-2">Original Price</label>
            <input
              type="number"
              name="price"
              value={originalPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter your product price..."
            />
          </div>

          <div className="w-[45%]">
            <label className="pb-2">
              Price (With Discount) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={discountPrice}
              className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder="Enter your product price with discount..."
            />
          </div>
        </div>
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 bg-green-500 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
