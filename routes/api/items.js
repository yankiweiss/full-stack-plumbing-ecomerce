const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const itemController = require('../../controllers/itemControler.js')




// JSON DATA

router
  .route("/")
  .get( itemController.getAllItems)

  .post(itemController.createNewItem)

 
  .delete(itemController.deleteItem);

router.route("/:id").get(itemController.getItem)
.put(itemController.updateItem)

router.route("/:query").get(itemController.searchItems)

module.exports = router;
