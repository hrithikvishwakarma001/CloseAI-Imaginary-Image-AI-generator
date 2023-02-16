
import mongoose  from 'mongoose';

const userschema=mongoose.Schema({
    name:{type:String,
    require:true},
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        select:false
    }
})


const User_owner=mongoose.model('user',userschema);

export {User_owner}