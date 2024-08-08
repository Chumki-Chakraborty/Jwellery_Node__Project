const BannerModel = require('../../../model/admin/admin_banner')
const Adminmodel=require("../../../model/user/user_auth")
const AdminBynowModel=require('../../../model/admin/buynow_model')
const productmodel=require('../../../model/admin/admin_product')
const flash=require('connect-flash')
const dashboard=async(req,res)=>{
    try{
        const admindata=await Adminmodel.find()
        if(admindata){
            res.render('admin/admin_dashboard/dashboard',{
                title:'admin dashboard',
                DATA:req.admin
            })

        }

    }catch(error){

    }

    // res.render('admin/admin_dashboard/dashboard',{
    //     title:'admin dashboard'
    // })
}
const admin_bannerpage=async(req,res)=>{
    try{
        const bannerdata = await BannerModel.find()
        if(bannerdata){
            res.render('admin/admin_dashboard/banner',{
                title:'admin banner page',
                alldata:bannerdata,
                DATA:req.admin
            })
        }else{
            console.log(`banner data not found`);
        }

    }catch(error){
        console.log(error);

    }


    // res.render('admin/admin_dashboard/banner',{
    //     title:'admin banner page'
    // })
}
// const admin_addbannerpage=async(req,res)=>{
//     const addbanner=await BannerModel.find()
//     if(addbanner){
//         res.render('admin/admin_dashboard/Addbanner',{
//             title:"Admin addbanner page",
//             bannerdata:addbanner
//         })

//     }// res.render('admin/admin_dashboard/Addbanner',{
//     //     title:"Admin addbanner page"
//     // })

// }
// ---------------------------AdminBuyNow---------------//
const AdminBuyNow=async(req,res)=>{
    try{
     //    const id=req.params.id
    //    const productdata=await productmodel.findById(id)
    const buynow=await AdminBynowModel.find().populate("UserId")
        res.render('admin/admin_dashboard/admin_buynow',{
            title:'admin buynow',
            DATA:req.admin,
            buynowproduct:buynow,
            message:req.flash('message')
        })
    }catch(error){
        console.log(error);
    }
}
module.exports={
    dashboard,
    admin_bannerpage,
    AdminBuyNow
}