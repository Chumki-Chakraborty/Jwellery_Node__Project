const mongoose=require('mongoose')

const OfferSchema=mongoose.Schema

const offerschema=new OfferSchema({
    offers:{
        type:String,
        required:[true,'offers is required']
    },
   image:{
        type:String,
        required:[true,'image is required']
    },
    status:{
        type:String,
        default:1
    }
})
const offerModel=mongoose.model('offer',offerschema)
module.exports=offerModel