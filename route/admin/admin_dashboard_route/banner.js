const express=require('express')
const { Admin_Post_Banner, admin_addbannerpage, admin_edit_banner, Admin_update_Banner, Admin_Delete_Banner } = require('../../../controller/admin/dashboard_controller/banner')
const adminbanner=express.Router()
const bannerimg=require('../../../utilits/bannerimg')
const { jwt_adminauth } = require('../../../middleware/auth')
const { Admin_AuthCheck } = require('../../../controller/admin/admin_auth_controller/admin_allauth')

adminbanner.get('/addbanner',jwt_adminauth,Admin_AuthCheck,admin_addbannerpage)
// adminbanner.post('/banner/post',Admin_Post_Banner)
adminbanner.get('/editbanner/:id',jwt_adminauth,Admin_AuthCheck,admin_edit_banner)
// adminbanner.post('/banner/update/:id',Admin_update_Banner)
adminbanner.get('/banner/delete/:id',jwt_adminauth,Admin_AuthCheck,Admin_Delete_Banner)
adminbanner.post('/banner/post',bannerimg.single('image'),Admin_Post_Banner)
adminbanner.post('/banner/update/:id',bannerimg.single('image'),Admin_update_Banner)


module.exports=adminbanner