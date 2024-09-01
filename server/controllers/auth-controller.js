const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req,res) => {
    try {
        res
            .status(200)
            .send("Welcome to world");
    } catch (error) {
        console.log(error);
    }
}

const register = async (req,res) => {
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message:"email already exists"});
        }
        
        const userCreated = await User.create({username, email, phone, password});
        

        res
            .status(200)
            .json({
                message: "registration Successful", 
                token: await userCreated.generateToken(), 
                userId: userCreated._id.toString(),
            });   
    } catch (error) {
        res.status(400).json({msg: "page not found"});
    }
}

const login = async (req,res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        // const isPassowordValid = await bcrypt.compare(password, userExist.password);

        const isPassowordValid = await userExist.comparePassword(password);

        if(isPassowordValid){
            res
            .status(200)
            .json({
                message: "Login Successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        }
        else{
            res.status(401).json({message:"Invalid email or password"});
        }


    } catch (error) {
        // res.status(400).json({msg: "page not found"});
        next(error);
    }
}


//to send user data

const user = async (req,res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData})
        // res.status(200).json({msg: "hi user"})
    } catch (error) {
        console.log(`error from user route ${error}`);
    }
}


module.exports = {home, register, login, user};