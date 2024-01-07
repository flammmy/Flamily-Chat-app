const messagesModel = require("../model/messageModel");

module.exports.addMessages = async (req,res,next) => {
    try{
        const {from,to,message} = req.body;
        const data = await messagesModel.create({
            message:{text : message},
            users : [from,to],
            sender : from,
        })
        if(data) return res.json({msg:"Message added successfully"});
        return res.json({msg : "Failed to add messsage to the database"});
    }
    catch(error){
        next(error)
    }
}
module.exports.getAllMessages = async (req,res,next) => {
    try{
        const {from,to} = req.body;
        const messages = await messagesModel.find(
            {
                users :{
                    $all : [from,to],
                }
            }
        ).sort({updatedAt : 1});
        const projectMessages = messages.map((msg) =>{
            return {
                fromSelf : msg.sender.toString() === from,
                message : msg.message.text,
            };
        });
        return res.json(projectMessages);
    }
    catch(error){
        next(error)
    }
}
