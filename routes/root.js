const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin.html"));
});

router.get("/dev", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "dev.html"));
  });

  router.get("/signIn.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "signIn.html"));
  });

  router.get("/create-account.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "create-account.html"));
  });

  router.get("/add-item.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "add-item.html"));
  });

  router.get("/edit-item.html", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "edit-item.html"));
  });

   router.get("/css", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "css.html"));
  });

  router.get("/category", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "category.html"));
  });


  router.get("/categoryProducts", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "categoryProducts.html"));
  });

  
  

  

module.exports = router;