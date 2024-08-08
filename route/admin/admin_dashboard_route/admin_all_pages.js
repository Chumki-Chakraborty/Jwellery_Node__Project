const express=require('express')
const { dashboard, admin_bannerpage, AdminBuyNow} = require('../../../controller/admin/dashboard_controller/admin_allpages')
const { jwt_adminauth } = require('../../../middleware/auth')
const { Admin_AuthCheck } = require('../../../controller/admin/admin_auth_controller/admin_allauth')
const admin_dashboard=express.Router()

admin_dashboard.get('/dashboard',jwt_adminauth,Admin_AuthCheck,dashboard)
admin_dashboard.get('/banner',jwt_adminauth,Admin_AuthCheck,admin_bannerpage)
// admin_dashboard.get('/buynow/:id',AdminBuyNow).
admin_dashboard.get('/buynow',jwt_adminauth,Admin_AuthCheck,AdminBuyNow)

module.exports=admin_dashboard