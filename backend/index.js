const express = require("express");

const app = express() ;  

app.get("/",(request , response)=>{
    response.send("Hello world")
})

const server = app.listen(8081,()=>{
    const host = server.address().address 
    const port = server.address().port 
    console.log(`Node.JS Server has been run , ${host} ${port} `)
})