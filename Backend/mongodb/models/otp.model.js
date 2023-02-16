// const mongoose=require('mongoose');
import mongoose from 'mongoose'


const otpschema=mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    otp:{
        type:String,
        require:true
    },
    expireat:{
        type:Number,
        default:Date.now()+300000
    },
    onejwt:{
        type:String
    }
})

const Otp=mongoose.model('otp',otpschema);

export {Otp}