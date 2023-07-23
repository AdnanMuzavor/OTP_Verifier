const mongoose=require("mongoose");
const validator=require("validator");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address");
            }
        }
    },
    otp:{
        type:String,
        required:true
    }
})

const OTPS=new mongoose.model("OTPS",OTPSchema);
module.exports=OTPS;