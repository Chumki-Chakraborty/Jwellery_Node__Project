const { ComparePassword, hashpassword } = require("../../../middleware/auth")
const Adminmodel=require("../../../model/user/user_auth")
const jwt=require('jsonwebtoken')
const flash=require("connect-flash")

const Admin_LoginPage=(req,res)=>{
    res.render('admin/admin_authintication/admin_login',{
        title:'admin login page',
        resetpassword:req.flash("resetpassword")
    })
}
//----------
const AdminLogin=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!(email&&password)){
            console.log(`all fields are required`);
            
            return res.redirect('/admin/login')
        }
        const AdminUser=await Adminmodel.findOne({email})
        if(!AdminUser){
            console.log(`email is not registered`);
            return res.redirect('/admin/login')
        }
        // MatchPassword
        if(AdminUser.role=='admin'){
        const MatchPassword=await ComparePassword(password,AdminUser.password)
        if(!MatchPassword){
            console.log(`Incorrect password`);
            return res.redirect('/admin/login')
        }
        const token=await jwt.sign({
            _id:AdminUser._id,
            name:AdminUser.name,
            email:AdminUser.email,
            password:AdminUser.password,
            mobile:AdminUser.mobile,
            first_school:AdminUser.first_school
        },process.env.JWT_SECRET,{expiresIn:'12hr'})
        if(token){
            res.cookie('admintoken',token)
            return res.redirect('/admin/dashboard')
        }
    }else{
            console.log(`error in user login ${error}`);
            return res.redirect('/admin/login')
        }

    }catch(error){
        console.log(error);
        

    }
}
// ------------Admin_AuthCheck------------//
const Admin_AuthCheck=(req,res,next)=>{
    if(req.admin){
       return next()
        }else{
            return res.redirect('/admin/login')
        }
   
}
// -------------------AdminLogout----------------//
const AdminLogout=(req,res)=>{
    res.clearCookie('admintoken')
    return res.redirect('/admin/login')
}
// ---------------------------ForgetPasswordPage------------------//
const AdminForgetPasswordPage=async(req,res)=>{
    res.render("admin/admin_authintication/Forgetpassword",{
        title:"Admin Forget password page..",
        passworderror:req.flash("passworderror")
    })
}
// --------------------AdminForgetPassword---------------//
const AdminForgetPassword=async(req,res)=>{
    try{
        const{email,Newpassword,first_school}=req.body
        if(!(email && Newpassword && first_school)){
            console.log(`Allfields are required..`);
            req.flash("passworderror","Allfields are required..")
            return res.redirect("/admin/forgetpassword")
            }
            const User=await Adminmodel.findOne({email,first_school}) 
            if(!User){
                console.log(`Incorrect email and first_school `);
                req.flash("passworderror","Incorrect email and First_school")
           return res.redirect("/admin/forgetpassword")
            }
            const Hased=await hashpassword(Newpassword)
            const ChangePassword=await Adminmodel.findByIdAndUpdate(User._id,{
                password:Hased
            })
            if(ChangePassword){
                console.log(`Password has been update successfully..Please login with your new password..`);
                req.flash("resetpassword","Password has been update successfully..Please login with your new password..")
                return res.redirect("/admin/login")
                
            }
    }catch(error){
        console.log(`Error to reset password ${error}`);
        
    }
}
// --------------------AminUpdatePasswordPage--------------------//
const AdminUpdatePasswordPage=async(req,res)=>{
    const id=req.params.id
    const Changepassword=await Adminmodel.findById(id)
    res.render("admin/admin_authintication/Updatepassword",{
        title:"Admin Update password page",
        Edit:Changepassword
    })
}
// --------------AdminUpdatePassword-----------------//
const AdminUpdatePassword=async(req,res)=>{
        try{
            const UserId=req.params.id
            const{Newpassword}=req.body
            const User=await Adminmodel.findOne({_id:UserId})
            if(User){
                const Hashed=await hashpassword(Newpassword)
                const ChangePassword=await Adminmodel.findByIdAndUpdate({_id:UserId},{
                    $set:{
                        password:Hashed
                    }
                })
                if(ChangePassword){
                    console.log(`Your password has been update successfully..`);
                    req.flash("resetpassword","Password has been update successfully..Please login with your new password..")
                    res.redirect("/admin/login")
                }
            }
        }catch(error){
            console.log(`Error to update password ${error}`);
            
        }
}
module.exports={
    Admin_LoginPage,
    AdminLogin,
    Admin_AuthCheck,
    AdminLogout,
    AdminForgetPasswordPage,
    AdminForgetPassword,
    AdminUpdatePasswordPage,
    AdminUpdatePassword
}