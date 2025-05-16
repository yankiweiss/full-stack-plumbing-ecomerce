const fileUpload = require('express-fileupload');


const uploadFiles = (req, res) => {
    const files = req.files

    console.log(files)

    return res.json({status: 'logged', message: 'logged'})
}


module.exports = {uploadFiles}