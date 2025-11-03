const express =require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const AuthRouter = require('./router/AuthRouter.js')
const ProductRouter=require('./router/productrouter.js')
require('dotenv').config();
require('./models/db.js')

const PORT=process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/products',ProductRouter)
app.use("/" ,(req,res)=>{
    console.log("your backend is running")
})



app.listen(PORT , ()=>{
    console.log(`server is runnig on port ${PORT}`)
})  