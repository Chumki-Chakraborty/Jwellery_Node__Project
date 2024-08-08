const mongoose=require('mongoose')

const Schema=mongoose.Schema

const Banner_Schema=new Schema({
    BannerTitle:{
        type:String,
        required:[true,'BannerTitle is required']
    },
    BannerDescription:{
        type:String,
        required:[true,'BannerTitle is required']
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
const BannerModel=mongoose.model('banner',Banner_Schema)
module.exports=BannerModel