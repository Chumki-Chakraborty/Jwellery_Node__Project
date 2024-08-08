const Usermodel=require("../../../model/user/user_auth")
const BannerModel = require('../../../model/admin/admin_banner')
const Productmodel=require('../../../model/admin/admin_product')
const Offermodel=require('../../../model/admin/offer')
const testimonialmodel = require('../../../model/admin/admin_testimonial')
 const buynowmodel=require('../../../model/admin/buynow_model')
// const BuyNowModel=require("../../../model/admin/buynow_model")
const flash=require('connect-flash')
const userhome=async(req,res)=>{
   const loginuserdata=await Usermodel.find()
   const bannerdata=await BannerModel.find()
   const GetProduct=await Productmodel.find()
   const alloffer=await Offermodel.find()
   const Alltestimonial = await testimonialmodel.find()
   
 
    res.render('front/userfront/fronthome',{
        title:"userhome",
        data:req.user,
        alldata:bannerdata,
        allproduct:GetProduct,
        offerdata:alloffer,
        testimonial_data: Alltestimonial,
        
        message:req.flash('message')
    })
   
    // res.render('front/userfront/fronthome',{
    //     title:"userhome",
        
    // })
}
// userabout
const userabout=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
    res.render('front/userfront/frontabout',{
        title:"frontabout",
        data:req.user
    })
}
// usershop
const usershop=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
    const GetProduct=await Productmodel.find()
    if(GetProduct){
        res.render('front/userfront/frontshop',{
            title:'usershop',
            allproduct:GetProduct,
            data:req.user
        })
    }
    }


// userblog
const userblog=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
    res.render('front/userfront/frontblog',{
        title:"frontblog",
        data:req.user
    })
}
// user_product_details
const user_product_details=async(req,res)=>{
    
    try{
        const loginuserdata=await Usermodel.find()
        // const User=await Usermodel.find()
        const id=req.params.id
        const getproduct=await Productmodel.findById(id)
        // console.log(getproduct);
        if(getproduct){
            res.render('front/userfront/front_product_details',{
                title:'product details',
                singledata:getproduct,
                // data:loginuserdata,
                data:req.user,
                message:req.flash('message')
            })
        }
    }catch(error){
        console.log(error);
    }
}
// user_blog_details
const user_blog_details=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
    res.render('front/userfront/front_blog_details',{
        title:"front blog details",
        data:req.user
    })
}
// user_blog_details_2
const user_blog_details_2=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
    res.render('front/userfront/front_blog_details2',{
        title:" front blogde tails2",
        data:req.user
    })
}
// ---------------Add BuyNow------------------//

const Add_buynow_product=async(req,res)=>{
    try{
    //     const id=req.params.id
    // const buyproduct=await Productmodel.findById(id)
    const{UserId,Productname,productDetails,productPrice,images}=req.body
    const product=new buynowmodel({
        UserId,Productname,productDetails,productPrice,images
    })
    
    const saveproduct=await product.save()
    if(saveproduct){
        console.log(`product added sucessfully`);
        req.flash('message',"Your order has been successfully placed...")
           res.redirect('/USER/orderconfirmation')
        //   res.redirect('/admin/buynow')
       
    }
    }catch(error){
        console.log(`product not added`,error);
    }
     
}

// --------------Buynow Page-------------//

const BuyNowPage=async(req,res)=>{
    const loginuserdata=await Usermodel.find()
        res.render("front/userfront/BuyNowPage",{
            title:"BuyNow Page",
            data:req.user,
            message:req.flash("message")

        })
    
}
// ----------------UserDashBoardPAge-----------//
const UserDashBoardPAge=async(req,res)=>{
    try{
        const UserId=req.params.id
       
        const orderdetails=await buynowmodel.find({UserId}).populate("UserId")
        res.render("front/userfront/Dashboard",{
            title:"UserDashboard page..",
            data:req.user,
            Userorder:orderdetails
        })
    }catch(error){
        console.log(error);
        
    }
}
module.exports={
    userhome,
    userabout,
    usershop,
    userblog,
    user_product_details,
    user_blog_details,
    user_blog_details_2,
    Add_buynow_product,
    UserDashBoardPAge,
    BuyNowPage
    
}