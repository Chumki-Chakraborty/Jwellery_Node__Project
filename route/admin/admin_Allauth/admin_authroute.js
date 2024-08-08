const express=require('express')
const { Admin_LoginPage, AdminLogin, AdminLogout, AdminForgetPasswordPage, AdminForgetPassword, AdminUpdatePasswordPage, Admin_AuthCheck, AdminUpdatePassword} = require('../../../controller/admin/admin_auth_controller/admin_allauth')
 const { jwt_adminauth } = require('../../../middleware/auth')

const admin_auth=express.Router()
admin_auth.get('/admin/login',Admin_LoginPage)
admin_auth.post('/admin/post/login',AdminLogin)
admin_auth.get('/admin/logout',AdminLogout)
admin_auth.get("/admin/forgetpassword",AdminForgetPasswordPage)
admin_auth.post("/admin/post/forgetpassword",AdminForgetPassword)
admin_auth.get("/admin/update/password/:id",jwt_adminauth,Admin_AuthCheck,AdminUpdatePasswordPage)
admin_auth.post("/admin/updatepassword/:id",AdminUpdatePassword)
module.exports=admin_auth