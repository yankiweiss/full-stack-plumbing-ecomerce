require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 3500;
const fs = require('fs')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn.js')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');
const multer = require("multer");
const storage = multer.memoryStorage(); // Store image in memory as buffer
const upload = multer({ storage });



app.use(bodyParser.json({ limit: '50mb' })); // or even '50mb' if needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: '*', // or '*'
  credentials: true // if using cookies
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())
app.use('/', require('./routes/root.js'))
app.use('/items', require('./routes/api/items.js'))
app.use('/categories', require('./routes/api/category.js'))
app.use('/register', require('./routes/register.js'))
app.use('/auth', require('./routes/auth.js'))
app.use('/user', require('./routes/user.js'))
app.use('/upload', require('./routes/upload.js'))
app.use('/refresh', require('./routes/refresh.js'))
app.use(cookieParser())






connectDB()

mongoose.connection.once("open", ()=> {
    console.log('Connected to MongoDB Database')
    app.listen(PORT, () => console.log(`app is running on ${PORT}`));
})





