const express = require('express')
const multer = require('multer')
const ejs = require('ejs')

const path = require('path')


const app = express()

app.set('view engine', 'ejs')

app.use(express.static('./public'))
app.get('/', (req, res) => {

    res.render('user')
})

const storgae = multer.diskStorage({
    destination: './public/upload',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storgae
}).single('Myimage')

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {

        if (err) {
            res.render('user',{msg:err});
        }
        else {
            console.log(req.file);
            res.send('file uploaded please chec in folder');
        }
    })

})

app.listen(5000, console.log('server is running'))