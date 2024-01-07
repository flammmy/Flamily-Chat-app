const {addMessages,getAllMessages} = require("../controllers/messagesControllers.js")

const router = require("express").Router();

router.post("/addmsg",addMessages);
router.post("/getmsg",getAllMessages);


module.exports = router;