const Category = require("../model/Category.js");
const fileUpload = require("express-fileupload");


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    const categoriesWithImage = categories.map((category) => {
      return {
        _id: category._id,
        category: category.category,
        quantity: category.quantity,
        image: category.image?.data
          ? `data:${category.image.contentType};base64,${category.image.data.toString(
              "base64"
            )}`
          : null,
      };
    });

    if (categoriesWithImage.length === 0) {
      return res.status(200).json({ message: "No items were found" });
    }

    res.json(categoriesWithImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createNewCategory = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "no image was uploaded!" });
    }

    const image = req.files.image;

    const result = await Category.create({
      category: req.body.category,
      quantity: req.body.quantity,
      image: {
        data: image.data,
        contentType: image.mimetype,
      },
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateCategory = (req, res) => {
  // will do this myself
  res.json({
    id: req.body.id,
    name: req.body.name,
  });
};

const deleteCategory = (req, res) => {
  res.json({ id: req.body.id });
};

const getCategory = (req, res) => {
  res.json({ id: req.body.id });
};

module.exports = {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
