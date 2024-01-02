const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/tutorial")
.then(()=>{
    console.log("mongo si connected sucessflly")
}).catch((e)=>{
    console.log("error in ongodb "+e)
})

const tutSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true   
    }    
    ,
    age:{
        type:String,
        required:true   
    } 
})

const Collection = mongoose.model("newCollection",tutSchema)