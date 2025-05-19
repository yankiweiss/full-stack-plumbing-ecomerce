const Item = require("../model/Item.js");
const fileUpload = require("express-fileupload");


const getAllItems = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category: category } : {};
    const items = await Item.find(query).exec();
   

    const itemsWithImage = items.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image?.data
          ? `data:${item.image.contentType};base64,${item.image.data.toString(
              "base64"
            )}`
          : null,
      };
    });

    if (itemsWithImage.length === 0) {
      return res.status(200).json({ message: "No items were found" });
    }

    res.json(itemsWithImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createNewItem = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "no image was uploaded!" });
    }

    const image = req.files.image;

    const result = await Item.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      quantity: req.body.quantity,
      image: {
        data: image.data, 
        contentType: image.mimetype,
      },
    });

    res.status(201).json({ message: "Item created", id: result._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


const updateItem = async (req, res) => {
  if (!req.body._id) {
    return res.status(400).json({ message: "No ID was provided" });
  }

  const item = await Item.findById(req.body._id).exec();
  if (!item) {
    return res.status(404).json({ message: "No item matched the ID" });
  }

  if (req.body.name) item.name = req.body.name;
  if (req.body.price !== undefined) item.price = req.body.price;
  if (req.body.description !== undefined) item.description = req.body.description;
    if (req.body.category !== undefined) item.category = req.body.category;

  if (req.files && req.files.image) {
  const image = req.files.image;
  item.image = {
    data: image.data,
    contentType: image.mimetype,
  };
}

  const result = await item.save();
  res.json(result);
};

const deleteItem = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "No ID Param was provided" });

  const item = await item.findOne({ _id: req.body.id }).exec();

  if (!item) {
    return res.status(204).json({ message: "no item matched the id" });
  }

  const result = await Item.deleteOne({_id : req.body.id});
  res.json(result);
};

const getItem = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "No ID Param was provided" });

  const item = await Item.findOne({ _id: req.params.id }).exec();

  if (!item) {
    return res.status(204).json({ message: "no item matched the id" });
  }

  
  res.json(item);
};




module.exports = {
  getAllItems,
  createNewItem,
  updateItem,
  deleteItem,
  getItem,
};
