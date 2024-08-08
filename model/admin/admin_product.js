const mongoose=require('mongoose')

const productSchema=mongoose.Schema

const product_Schema=new productSchema({
    Productname:{
        type:String,
        required:[true,'Productname is required']
    },
    productDetails:{
        type:String,
        required:[true,'productDetails is required']
    },
    productPrice:{
        type:Number,
        required:[true,'productPrice is required']
    },
    
    images:{
        type:String,
        required:[true,'image is required']
    },
    status:{
        type:String,
        default:'Arrivel'
    }
})
const ProductModel=mongoose.model('product',product_Schema)
module.exports=ProductModel