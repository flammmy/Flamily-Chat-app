const User = require("../model/userModel");
const bcrypt = require("bcryptjs");


module.exports.register = async (req,res,next) => {
    try{
        const {username,email,password} = req.body;
        const userNameCheck = await User.findOne({username});
        if(userNameCheck){
            return res.json({msg : "Username already taken",status : false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg : "Email already used",status : false});
        }
        const hashedPassword = await bcrypt.hash(password,7);
        const user = await User.create({
            email,
            username,
            password : hashedPassword
        });
        delete user.password;
        return res.json({status: true, user});
    }
    catch(ex){
        next(ex);
    }
    

};

module.exports.login = async (req,res,next) => {
    try{
        const {username,password} = req.body;
        const isUser = await User.findOne({username});
        if(!isUser){
            return res.json({msg : "Incorrect username or password",status : false});
        }
        const isValidPassword = await bcrypt.compare(password,isUser.password);
        if(!isValidPassword){
            return res.json({msg : "Incorrect username or password",status : false});
        }
        delete isUser.password;

        return res.json({status: true, isUser});
    }
    catch(ex){
        next(ex);
    }
    

};
module.exports.setAvatar = async (req,res,next) => {
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet : true,
            avatarImage
        });
        return res.json( 
           {isSet: userData.isAvatarImageSet,
            image : userData.avatarImage}
        )
    }catch(error){
        next(error);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
