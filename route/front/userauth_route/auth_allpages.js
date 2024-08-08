const express=require("express")
const { User_Register, User_login, User_UpdatePassword, User_ForgetPassword, user_registration, LogInUser, UserForget_Password, UserLogout,User_AuthCheck, UserUpdatePassword } = require("../../../controller/front/auth_controller/user_all_auth")
 const { jwt_userauth } = require("../../../middleware/auth")

const user_auth=express.Router()

user_auth.get('/',User_Register)
user_auth.get('/user/login',User_login)
user_auth.get('/user/update/password/:id',jwt_userauth,User_AuthCheck ,User_UpdatePassword)
user_auth.get('/user/forget/password',User_ForgetPassword)

//------------------post----------//
user_auth.post('/user/post/register',user_registration)
user_auth.post('/user/post/login',LogInUser)
user_auth.post('/user/post/forgetpassword',UserForget_Password)
user_auth.get('/user/logout',UserLogout)
user_auth.post("/user/update/password/:id",UserUpdatePassword)
module.exports=user_auth