require('dotenv').config()
const express = require('express');
require('./db/db')
const cors  = require('cors')

const category = require('./routes/category/categoryRoute')
const productRoute = require('./routes/product/productRoute')
const userRoute = require('./routes/user/userRoutes')
const slideImageRoute = require('./routes/slide-image/slide-image-route')
const verifyRoute = require('./routes/verifyEveryTime/verify')
const menu = require('./routes/menu/menu')
const permission = require('./routes/menu/permission')
const role = require('./routes/role/roleRoute')
const admin = require('./routes/admin/adminRoute')
const app = express()
app.use('/uploads',express.static('uploads'))

app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('Welcome to our website')
})

app.use('/user',userRoute)
app.use('/products',productRoute)
app.use('/category',category)
app.use('/verify',verifyRoute)
app.use('/slide-image',slideImageRoute)
app.use('/menu',menu)
app.use('/permission',permission)
app.use('/role',role)
app.use('/admin',admin)

const port = process.env.PORT || 400;

app.listen(port, console.log(`Server is running on Port ${port}`))