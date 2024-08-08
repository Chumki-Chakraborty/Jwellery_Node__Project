const mongoose=require('mongoose')

const Schema=mongoose.Schema

const BuyNowSchema=new Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    Productname:{
        type:String,
        required:true
    },
    productDetails:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:1
    }
})

const buynowmodel=mongoose.model('buynowproduct',BuyNowSchema)

module.exports=buynowmodel
