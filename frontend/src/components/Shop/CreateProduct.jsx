import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData, conditionData, deliveryMethod, productData } from "../../static/data";
import {
  brands,
  RAM,
  phoneconditionData,
  internalstorageData,
  batterycapacityData,
  operatingsystemData,
  displaytypeData,
  screensizeData,
  memorycardData,
  simtypeData,
  networkData,
  colorData,
  inclusionData,
  tradeinData,
  warrantyData,
  delivery
} from "../../static/phones";
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
  const [model, setModel] = useState("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");
  const [ram, setRam] = useState("");
  const [internalstorage, setInternalstorage] = useState("");
  const [batterycapacity, setBatterycapacity] = useState("");
  const [operatingsystem, setOperatingsystem] = useState("");
  const [displaytype, setDisplaytype] = useState("");
  const [screensize, setScreensize] = useState("");
  const [memorycard, setMemorycard] = useState("");
  const [simtype, setSimtype] = useState("");
  const [network, setNetwork] = useState("");
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [tradein, setTradein] = useState("");
  const [warranty, setWarranty] = useState("");
  const [delivery_method, setDelivery_method] = useState();
  const [county, setCounty] = useState();
  const [quantity, setQuantity] = useState();
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
  const handleInclusionChange = (e) => {
    const { value } = e.target;
    if (selectedInclusions.includes(value)) {
      setSelectedInclusions(selectedInclusions.filter((item) => item !== value));
    } else {
      setSelectedInclusions([...selectedInclusions, value]);
    }
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
    newForm.append("model", model);
    newForm.append("ram", ram);
    newForm.append("internalstorage", internalstorage);
    newForm.append("batterycapacity", batterycapacity);
    newForm.append("operatingsystem", operatingsystem);
    newForm.append("displaytype", displaytype);
    newForm.append("screensize", screensize);
    newForm.append("memorycard", memorycard);
    newForm.append("simtype", simtype);
    newForm.append("network", network);
    newForm.append("selectedInclusions", selectedInclusions);
    newForm.append("tradein", tradein);
    newForm.append("warranty", warranty);
    newForm.append("color", color);
    newForm.append("pattern", pattern);
    newForm.append("sizes", sizes);
    newForm.append("styles", styles);
    newForm.append("material", material);
    newForm.append("delivery_method", delivery_method);
    newForm.append("quantity", quantity);
    newForm.append("county", county);
    newForm.append("gender", gender);
    newForm.append("location", location);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    // Calculate the size of the payload
    const payloadSize = Array.from(newForm.values()).reduce((acc, current) => {
      if (typeof current === 'string') {
        return acc + current.length;
      }
      if (current instanceof Blob || current instanceof File) {
        return acc + current.size;
      }
      // Handle other types as needed (e.g., number, boolean)
      return acc + JSON.stringify(current).length;
    }, 0);

    console.log('Payload size:', payloadSize, 'bytes');
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
        model,
        ram,
        internalstorage,
        batterycapacity,
        operatingsystem,
        displaytype,
        screensize,
        memorycard,
        simtype,
        network,
        selectedInclusions,
        tradein,
        warranty,
        color,
        material,
        pattern,
        sizes,
        styles,
        condition,
        delivery_method,
        quantity,
        county,
        gender,
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
  const modelData = brands.find((brand) => brand.title === brands)?.models || [];
  const locationData = counties.find((countyItem) => countyItem.title === county)?.location || [];
  const genderOption = categoriesData.find((cat) => cat.title === category)?.gender || [];



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

  const handleTradeInChange = (e) => {
    setTradein(e.target.value);
  };
  const handlewarrantyChange = (e) => {
    setWarranty(e.target.value);
  }

  return (
    <div className="w-[100%] 800px:w-[100%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />

        {/* common field */}
        <div>
          <label className="pb-2">
            Title <span className="text-red-500">*</span>
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
              <label className="pb-2">Subcategory<span className="text-red-500">*</span></label>
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
              <div className="w-[20%]">
                <label className="pb-2">Gender</label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" className="font-bold">Gender</option>
                  {genderOption.map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
              {category !== "Choose a brand" && (
                <div className="w-[20%]">
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

              {category !== "Choose a category" && subcategory == "Watches & Fitness Trackers" && (
                <div className="w-[45%]">
                  <label className="pb-2">
                    Casematerial
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

              {category !== "Choose a category" && subcategory !== "Watches & Fitness Trackers" && (
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
              {category !== "Choose a category" && subcategory !== "Watches & Fitness Trackers" && (
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
              {category !== "Choose a category" && subcategory !== "Watches & Fitness Trackers" && (
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
            {category !== "Choose a category" && subcategory !== "Watches & Fitness Trackers" && (
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
                Delivery Method
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
        {/* Phones, Tablets & Accessories */}
        {category === "Phones, Tablets & Accessories" && (
          <>
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">
              {category !== "Choose a brand" && (
                <div className="w-[45%]">
                  <label className="pb-2">Brand</label>
                  <select
                    className="w-full mt-2 border h-[40px] rounded-[5px]"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="" className="font-bold">Select brand</option>
                    {brands.map((brands) => (
                      <option value={brands.title} key={brands.title}>
                        {brands.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {brands !== "Select brand" && (
                <div className="w-[45%]">
                  <label className="pb-2">Model</label>
                  <select
                    className="w-full mt-2 border h-[40px] rounded-[5px]"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="" className="font-bold">Select  Model</option>
                    {modelData.map((model) => (
                      <option value={model} key={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <br />
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">

              <div className="w-[45%]">
                <label className="pb-2">Condition</label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Gadget Condition</option>
                  {phoneconditionData.map((conditionItem) => (
                    <option value={conditionItem.value} key={conditionItem.value}>
                      {conditionItem.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[45%]">
                <label className="pb-2 ">
                  RAM
                </label>
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">RAM</option>
                  {RAM.map((Ram) => (
                    <option value={Ram.value} key={Ram.value}>
                      {Ram.value}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <br />
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">

              <div className="w-[30%]">
                {/* <label className="pb-2">Internal Storage</label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={internalstorage}
                  onChange={(e) => setInternalstorage(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Internal Storage</option>
                  {internalstorageData.map((internal) => (
                    <option value={internal.value} key={internal.value}>
                      {internal.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={batterycapacity}
                  onChange={(e) => setBatterycapacity(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Battery Capacity</option>
                  {batterycapacityData.map((batterycapacity) => (
                    <option value={batterycapacity.value} key={batterycapacity.value}>
                      {batterycapacity.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={operatingsystem}
                  onChange={(e) => setOperatingsystem(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Operating System</option>
                  {operatingsystemData.map((operatingsystem) => (
                    <option value={operatingsystem.value} key={operatingsystem.value}>
                      {operatingsystem.value}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <br />

            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">

              <div className="w-[30%]">
                {/* <label className="pb-2">Internal Storage</label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={displaytype}
                  onChange={(e) => setDisplaytype(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Display Type</option>
                  {displaytypeData.map((display) => (
                    <option value={display.value} key={display.value}>
                      {display.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={screensize}
                  onChange={(e) => setScreensize(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Screen Size</option>
                  {screensizeData.map((screen) => (
                    <option value={screen.value} key={screen.value}>
                      {screen.value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={memorycard}
                  onChange={(e) => setMemorycard(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Memory Card</option>
                  {memorycardData.map((memory) => (
                    <option value={memory.type} key={memory.type}>
                      {memory.type}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <br />
            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">

              <div className="w-[30%]">
                {/* <label className="pb-2">Internal Storage</label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={simtype}
                  onChange={(e) => setSimtype(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Sim Type</option>
                  {simtypeData.map((sim) => (
                    <option value={sim.type} key={sim.type}>
                      {sim.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Network Type</option>
                  {networkData.map((net) => (
                    <option value={net.type} key={net.type}>
                      {net.type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <select
                  className="w-full mt-2 border h-[40px] rounded-[5px]"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="Choose a category" className="font-bold">Color</option>
                  {colorData.map((color) => (
                    <option value={color} key={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

            </div>
            <br />

            <div className="flex justify-between sm:w-auto mb-4 sm:mb-0">

              <div className="w-[30%]">
                <label className="pb-2">Select Inclusions:</label>
                {inclusionData.map((inclusion) => (
                  <div key={inclusion}>
                    <input
                      type="checkbox"
                      value={inclusion}
                      checked={selectedInclusions.includes(inclusion)}
                      onChange={handleInclusionChange}
                    />
                    <label className="pl-1">{inclusion}</label>
                  </div>
                ))}
                <p>Selected Inclusions: {selectedInclusions.join(', ')}</p>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <div>
                  <label>Trade-In Options:</label>
                  {tradeinData.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={tradein === option}
                          onChange={handleTradeInChange}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-[30%]">
                {/* <label className="pb-2 ">
                  RAM
                </label> */}
                <div>
                  <label>Warranty Services:</label>
                  {warrantyData.map((option) => (
                    <div key={option}>
                      <label>
                        <input
                          type="radio"
                          value={option}
                          checked={warranty === option}
                          onChange={handlewarrantyChange}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

            </div>
            <br />
            <div>
              <label className="pb-2">
                Get Item By:
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
        <br />
        <div>
          <label className="pb-2">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter the quantity you want eg.1,2,3"
          />
        </div>
        <br />
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
