const mongoose=require('mongoose')

const testimonialSchema=mongoose.Schema

const Testimonial_Schema=new testimonialSchema({
    name:{
        type:String,
        required:[true,'Productname is required']
    },
    Details:{
        type:String,
        required:[true,'productDetails is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    status:{
        type:String,
        default:'testimonial'
    }
})
const TestimonialModel=mongoose.model('Testimonial',Testimonial_Schema)
module.exports=TestimonialModel