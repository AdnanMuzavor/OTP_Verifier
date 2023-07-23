const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs=require("bcryptjs");
const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not Valid Email");
      }
    },
  },
  password: {
    type: String,
    required:true,
  },
});

UserSchema.pre('save',async function(next){
  
    if(this.isModified("password")){
      this.password=await bcryptjs.hash(this.password,10);
    }
    next();
})
const User = new mongoose.model("User", UserSchema);
module.exports = User;
