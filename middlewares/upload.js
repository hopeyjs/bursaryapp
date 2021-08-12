const path =  require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, cd){
        cd(null, 'uploads/')
    },
    filename: function(req, file, cb) {

        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    }
})

module.exports = upload;
