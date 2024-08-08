const express=require('express')
const ejs=require('ejs')
const path = require('path')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const session = require('express-session')
const app=express()

// to get from data
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// mongodb Connection
const dotenv=require("dotenv")
dotenv.config()
const mongodb_connection=require("./config/database")
mongodb_connection()
// flash message
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge:600000}
  }))
app.use(flash());

app.use(cookieParser())
// Ejs page
app.set('view engine',"ejs")
app.set("views","views")
// for public
app.use(express.static(path.join(__dirname,'public')))

// frontPages
const frontPages=require('./route/front/frontuser_route/user_all_pages')
app.use('/USER',frontPages)
// User Authintication
const user_auth=require('./route/front/userauth_route/auth_allpages')
app.use(user_auth)
// Admin_dashboard_pages
const Admin_dashboard_pages=require('./route/admin/admin_dashboard_route/admin_all_pages')
app.use('/admin',Admin_dashboard_pages)
// Admin_banner_pages
const Admin_banner_pages=require('./route/admin/admin_dashboard_route/banner')
app.use('/admin',Admin_banner_pages)
// Admin_product_pages
const Admin_product_pages=require('./route/admin/admin_dashboard_route/product')
app.use('/admin',Admin_product_pages)
// Admin_offer_pages
const Admin_offers=require('./route/admin/admin_dashboard_route/offers')
app.use('/admin',Admin_offers)
// Admin_testimonials_pages
const Admin_testimonials_pages=require('./route/admin/admin_dashboard_route/testimonials')
app.use('/admin',Admin_testimonials_pages)
// Admin_Auth_Route
const Admin_Auth_Route=require('./route/admin/admin_Allauth/admin_authroute')
app.use(Admin_Auth_Route)
// Image
app.use('/uploads',express.static('uploads'))

const port=2024
app.listen(port,()=>{
    console.log(`server is running http://localhost:${port}`);
})