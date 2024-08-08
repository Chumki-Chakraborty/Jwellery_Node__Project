const express=require('express')
const { userhome, userabout, userblog, usershop, user_product_details, user_blog_details, user_blog_details_2, Add_buynow_product, UserDashBoardPAge, BuyNowPage } = require('../../../controller/front/frontuser_controller/userall_pages')
const { jwt_userauth } = require('../../../middleware/auth')
const { User_AuthCheck } = require('../../../controller/front/auth_controller/user_all_auth')
const front_pages=express.Router()

// ------ USER ALL PAGES--------///
front_pages.get('/user/home',jwt_userauth,User_AuthCheck,userhome)
front_pages.get('/user/about',jwt_userauth,User_AuthCheck,userabout)
front_pages.get('/user/shop',jwt_userauth,User_AuthCheck,usershop)
front_pages.get('/user/blog',jwt_userauth,User_AuthCheck,userblog)
front_pages.get('/user/produt/details/:id',jwt_userauth,User_AuthCheck,user_product_details)

front_pages.get('/useredit/:id',jwt_userauth,User_AuthCheck,user_product_details)

front_pages.get("/user/blog/details",jwt_userauth,User_AuthCheck,user_blog_details)
front_pages.get('/user/blog/details/2',jwt_userauth,User_AuthCheck,user_blog_details_2)


front_pages.post('/add/buynow/:id',Add_buynow_product)
front_pages.get("/Dashboard/:id",jwt_userauth,User_AuthCheck,UserDashBoardPAge)
front_pages.get("/orderconfirmation",jwt_userauth,User_AuthCheck,BuyNowPage)
module.exports=front_pages