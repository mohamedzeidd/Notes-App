const express = require("express")
const router = express.Router()
const noteController = require("../controllers/noteController")
const {requireAuth , checkUser} = require("../middleware/authMiddleware")


router.get("/notes" ,requireAuth,noteController.notes_get)
router.get("/add-note" ,requireAuth,noteController.addNote_get)
router.post("/add-note" ,requireAuth,noteController.addNote_post)
router.post("/delete-note/:id",requireAuth,noteController.deleteNote_post)
router.get("/update-note/:id",noteController.updateNote_get)
router.post("/update-note/:id" , noteController.updateNote_post)



module.exports = router
