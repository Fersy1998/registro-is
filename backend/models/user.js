const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
    },
    ID:{
        type:String,
        required:true,
        select:false
    },
    birthDate:{
        type:String,
    },
    profileImageUrl:{
      type:String,
    },
    isValid:{
        type:Boolean
    }
  
});


module.exports = mongoose.model('User', userSchema);