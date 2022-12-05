require("dotenv").config()
const express = require('express')
var cors = require('cors')
const path=require('path')
const users=require("./routes/user")

const app = express()

const port = 3000
app.use(cors())
app.use(express.json());
app.use("/userapi",users)


app.get("*",(req,res)=>{
    res.sendFile("index.html",{root:path.join(__dirname,"../frontend","dist")})
})
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})