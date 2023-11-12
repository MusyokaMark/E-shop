const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  subcategory: {
    type: String,
    required: [true, "Please enter your product subcategory!"],
  },
  type: {
    type: String,
  },
  specialSpecs: {
    type: String,
  },
  tags: {
    type: String,
  },
  productType:{
    type: String,
  },
  condition: {
    type: String,
  },
  delivery_method: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  discountPrice: {
    type: Number, 
  },
  county: {
    type: String,
    requires: [true, "Enter location"],
  },
  location: {
    type: String,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
  },
  color: [{
     type: String 
    }],
  // color: {
  //   type: String,
  // },
  material: {
    type: String,
  },
  pattern: {
    type: String,
  },
  sizes: {
    type: String,
  },
  styles: {
    type: String,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt:{
        type: Date,
        default: Date.now(),
      }
    },
  ],
  ratings: {
    type: Number,
  },
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
