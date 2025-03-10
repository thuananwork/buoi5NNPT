const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, default: "" },
    quantity: { type: Number, default: 0, min: 0 },
    imgURL: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted: { type: Boolean, default: false }, // Thêm cờ xóa mềm
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
