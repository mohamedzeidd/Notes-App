const mongoose = require("mongoose")


const noteSchema = new mongoose.Schema({


ownerID:{
    type:String,
    required:true
},

title:{
    type:String,
    required:[true , "You must add a title"],
},

description:{
    type:String,
    required:[true , "You must add a description"],
}

})

const Note = mongoose.model("note" , noteSchema)
module.exports = Note