const testimonialmodel = require('../../../model/admin/admin_testimonial')
const Adminmodel=require("../../../model/user/user_auth")
const path=require('path')
const fs=require('fs')
const testimonials_page = async (req, res) => {
    try {
        const Alltestimonial = await testimonialmodel.find()
        if (Alltestimonial) {
            res.render('admin/admin_dashboard/testimonials', {
                title: "admin testimonials page",
                testimonial_data: Alltestimonial,
                DATA:req.admin
            })
        } else {
            console.log(`testimonial data not found`);
        }

    } catch (error) {
        console.log(error);

    }
}
//--------------AddTestimonials----------//
const AddTestimonials = (req, res) => {
    res.render('admin/admin_dashboard/Addtestimonial', {
        title: "Add testimonials page",
        DATA:req.admin
    })
}
//--------------PostTestimonials----------//
const PostTestimonials = async (req, res) => {
    // console.log(req.body);
    try {
        const { name, Details } = req.body
        const testimonial = new testimonialmodel({
            name, Details
        })
        if(req.file){
            testimonial.image=req.file.path
        }
        const savetestimonial = await testimonial.save()
        if (savetestimonial) {
            console.log(`Testimonial added sucessfully`,savetestimonial);
            res.redirect('/admin/testimonials')
        } else {
            res.redirect('/admin/addtestimonials')
        }

    } catch (error) {
        console.log(error);
    }
}
//--------------EditTestimonials----------//
const EditTestimonials=async(req,res)=>{
    try{
        const id=req.params.id
    const TestimonialEdit=await testimonialmodel.findById(id)
    if(TestimonialEdit){
        res.render('admin/admin_dashboard/edit_testimonial',{
            title: "edit testimonials page",
            edit:TestimonialEdit,
            DATA:req.admin
        })
    }else{
        console.log(`testimonial data is not edited`);
    }

    }catch(error){
        console.log(error);
    }
}
//--------------UpdateTestimonials----------//
const UpdateTestimonials=async(req,res)=>{
    try{
        const{name,Details}=req.body
        const id=req.params.id
        const testimonialduplicateimg=await testimonialmodel.findById(id)
        fs.unlinkSync(testimonialduplicateimg.image)
        const newimg=req.file.path
        
         const updatetestimonial=await testimonialmodel.findByIdAndUpdate(id,{
            name,Details,image:newimg
         },{new:true})
         if(updatetestimonial){
            console.log(`testimonial data has been updated`);
            res.redirect('/admin/testimonials')
         }else{
            console.log(`error to update testimonial data`);
         }
         

    }catch(error){
        console.log(error);
    }
}
//--------------DeleteTestimonials----------//
const DeleteTestimonials=async(req,res)=>{
    try{
        const id=req.params.id
        const deletetestimonial=await testimonialmodel.findByIdAndDelete(id)
        if(deletetestimonial){
            console.log(`delete testimonial data`,deletetestimonial);
            fs.unlinkSync(deletetestimonial.image)
            res.redirect('/admin/testimonials')
        }else{
            console.log(`error to delete testimonial data`);
        }

    }catch(error){
        console.log(error);
    }
}
module.exports = {
    testimonials_page,
    AddTestimonials,
    PostTestimonials,
    EditTestimonials,
    UpdateTestimonials,
    DeleteTestimonials
}