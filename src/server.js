const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("hello")
    res.end()
})

app.listen(PORT,(port)=>{
    console.log(`> Express api running on port ${PORT}`);
})