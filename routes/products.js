const express = require("express");
const router = express.Router();
const Product = require("../schemas/product");

// Lấy danh sách sản phẩm (lọc theo query)
router.get("/", async (req, res) => {
  try {
    let filter = { isDeleted: false };

    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    let products = await Product.find(filter).populate("category");
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id).populate("category");
    if (!product || product.isDeleted)
      throw new Error("Sản phẩm không tồn tại");

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Tạo sản phẩm mới
router.post("/", async (req, res) => {
  try {
    let newProduct = new Product(req.body);
    await newProduct.save();

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Cập nhật sản phẩm
router.put("/:id", async (req, res) => {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) throw new Error("Sản phẩm không tồn tại");

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Xóa mềm sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findById(req.params.id);
    if (!deletedProduct) throw new Error("Sản phẩm không tồn tại");

    deletedProduct.isDeleted = true;
    await deletedProduct.save();

    res.status(200).json({ success: true, message: "Đã xóa sản phẩm" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
