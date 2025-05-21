const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const categoriesController = require('../../controllers/catagoryControler.js')
const verifyJWT = require('../../middleware/verifyJWT.js')


// JSON DATA

router
  .route("/")
  .get(categoriesController.getAllCategories)

  .post(categoriesController.createNewCategory)

  .put(categoriesController.updateCategory)
  .delete(categoriesController.deleteCategory);

router.route("/:id").get(categoriesController.getCategory);

module.exports = router;
