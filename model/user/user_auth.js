const mongoose=require('mongoose')


const schema=mongoose.Schema

const userschema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    first_school:{
        type:String,
        required:true
    },
    // newpassword:{
    //     type:String,
    //     required:true
    // },
    role:{
        type:String,
        default:'user'
    }

})

const Usermodel=mongoose.model('user',userschema)

module.exports=Usermodel