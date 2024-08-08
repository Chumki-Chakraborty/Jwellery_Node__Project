const express=require('express')
const { testimonials_page, AddTestimonials, PostTestimonials, EditTestimonials, UpdateTestimonials, DeleteTestimonials } = require('../../../controller/admin/dashboard_controller/testimonials')
const testimonials_route=express.Router()

const TestimonialImg=require('../../../utilits/testimonials')
const { jwt_adminauth } = require('../../../middleware/auth')
const { Admin_AuthCheck } = require('../../../controller/admin/admin_auth_controller/admin_allauth')


testimonials_route.get('/testimonials',jwt_adminauth,Admin_AuthCheck,testimonials_page)
testimonials_route.get('/addtestimonials',jwt_adminauth,Admin_AuthCheck,AddTestimonials)
// testimonials_route.post('/post/testimonial',PostTestimonials)
testimonials_route.post('/post/testimonial',TestimonialImg.single('image'),PostTestimonials)
testimonials_route.get('/edit/testimonil/:id',jwt_adminauth,Admin_AuthCheck,EditTestimonials)
// testimonials_route.post('/update/testimonial/:id',UpdateTestimonials)
testimonials_route.post('/update/testimonial/:id',TestimonialImg.single('image'),UpdateTestimonials)
testimonials_route.get('/delete/testimonial/:id',jwt_adminauth,Admin_AuthCheck,DeleteTestimonials)
module.exports=testimonials_route