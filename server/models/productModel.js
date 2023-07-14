import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Please add an itemName"],
  },

  price: {
    type: Number,
    required: [true, "Please add a price"],
  },  

  category: {
    type: String,
    enum: ["New", "Popular", "Recommended", ''],
   
  },

  categoryItem: {
    type: String,
    enum: ["Buff Momo", "Veg Momo", "Chicken Momo", "Pork Momo"],
    required: [true, "Please add a category item"],
  },

  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;

