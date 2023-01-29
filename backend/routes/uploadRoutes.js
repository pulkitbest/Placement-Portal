import express from "express"
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        if(path.extname(file.originalname) === '.pdf') cb(null, `CV-${file.originalname}`)
        else cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileTypeImage(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

function checkFileTypePdf(file, cb){
    const filetypes = /pdf/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    } else {
        cb('Pdf only!')
    }
}

const uploadImage = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileTypeImage(file, cb)
    }
})

router.post('/', uploadImage.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

const uploadPdf = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileTypePdf(file, cb)
    }
})

router.post('/resume', uploadPdf.single('file'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router