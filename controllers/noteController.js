const Note = require("../models/Note")
const {checkUser} = require("../middleware/authMiddleware")
const jwt = require("jsonwebtoken")
const { findOne, findById } = require("../models/Note")



const handleErrors = (err)=>{

    console.log(err.message , err.code)

    let errors = {title:"" , description:""}



     //validation errors
     if(err.message.includes("note validation failed"))
     {
         Object.values(err.errors).forEach(({properties})=>{
             errors[properties.path] = properties.message
         })
     }
     return errors
 

}






module.exports.notes_get = async(req , res)=>{


    const ownerID = res.locals.user._id
    try{
        const notes = await Note.find({ownerID})
        res.locals.notes = notes
        res.status(201).render("notes" )
    }catch(err){
        console.log(err)
        res.status(400).json("error")
    }







}

module.exports.addNote_get = (req , res)=>{
    res.render("add_note")

}


module.exports.addNote_post = async(req , res)=>{

const {title , description} = req.body
const ownerID = res.locals.user._id
try{

    const note = await Note.create({title , description , ownerID})
    res.status(201).json({note:note._id})


}catch(err){
    const errors = handleErrors(err)
    res.status(400).json({errors})
}



}






module.exports.updateNote_get = async (req , res)=>{


    const id = req.params.id
    const note = await Note.findById(id)    
    res.render("update_note" , {note})


}


module.exports.updateNote_post = async(req , res)=>{
    const {title , description} = req.body
    const id = req.params.id

    try{
        const note = await Note.findByIdAndUpdate(id , {
            title , description
        })
        res.status(201).json({note:note._id})
    }catch(err){
        const errors = handleErrors(err)
        res.status(400).json({errors})
    }

    
}



module.exports.deleteNote_post = async(req , res)=>{
    const id = req.params.id
    try{
        await Note.findByIdAndDelete(id)
        res.redirect("/notes")
    }catch(err){
        console.log(err)
    }
}




