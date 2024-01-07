const {register,login,setAvatar, getAllUsers} = require("../controllers/userControllers.js")

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setavatar/:id",setAvatar);
router.get("/allusers/:id",getAllUsers);

module.exports = router;