const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const itemController = require("../../controllers/itemControler.js");
const verifyJWT = require("../../middleware/verifyJWT.js");
const ROLES_LIST = require('../../config/roles_list.js')
const verifyRoles = require('../../middleware/verifyRoles.js')


// JSON DATA

router.route("/search/:query").get(itemController.searchItems);

router.route('/post')
  .post(verifyJWT, itemController.createNewItem)

router
  .route("/")
  .get(verifyJWT, verifyRoles(ROLES_LIST.Admin) ,itemController.getAllItems)

  

  .delete(itemController.deleteItem);

router.route("/:id").get(itemController.getItem).put(itemController.updateItem);

module.exports = router;
