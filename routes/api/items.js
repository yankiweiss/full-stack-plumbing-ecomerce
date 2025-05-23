const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const itemController = require("../../controllers/itemControler.js");
const verifyJWT = require("../../middleware/verifyJWT.js");


// JSON DATA

router.route("/search/:query").get(itemController.searchItems);


router
  .route("/")
  .get(itemController.getAllItems)

  .post(itemController.createNewItem)

  .delete(itemController.deleteItem);

  router.route("/:id").get(itemController.getItem).put(itemController.updateItem);

module.exports = router;
