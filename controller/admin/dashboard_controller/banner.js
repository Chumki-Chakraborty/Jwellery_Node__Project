const BannerModel = require('../../../model/admin/admin_banner')
const Adminmodel=require("../../../model/user/user_auth")
const path=require('path')
const fs=require('fs')
// ------------------------Admin Add Banner------------------//

const admin_addbannerpage = async (req, res) => {
    res.render('admin/admin_dashboard/Addbanner',{
           title:"Admin addbanner page",
           DATA:req.admin
       })
   }

// ------------------------Admin Post Banner------------------//

const Admin_Post_Banner = async (req, res) => {
    // console.log(req.body);
    try {
        const { BannerTitle, BannerDescription } = req.body
        const Addbanner = new BannerModel({
            BannerTitle, BannerDescription
        })
        if(req.file){
            Addbanner.image=req.file.path
        }
        const savebanner = await Addbanner.save()
        if (savebanner) {
            console.log(`banner added sucessfully`);
            res.redirect('/admin/banner')
        } else {
            res.redirect('/admin/addbanner')
        }

    } catch (error) {
        console.log(error);

    }
}
// ------------------------Admin Edit Banner------------------//
const admin_edit_banner=async(req,res)=>{
    try{
        const id=req.params.id
        const EditBanner=await BannerModel.findById(id)
        if(EditBanner){
            res.render('admin/admin_dashboard/editbanner',{
                title:"edit banner",
                edit:EditBanner,
                DATA:req.admin
            })
        }else{
            console.log(`banner data is not edited`);
        }

    }catch(error){
        console.log(error);
    }

}
// ------------------------Admin update Banner------------------//
const Admin_update_Banner=async(req,res)=>{
    try{
        const { BannerTitle, BannerDescription } = req.body
        const newimg=req.file.path
        const id=req.params.id
        const duplicateimg=await BannerModel.findById(id)
        fs.unlinkSync(duplicateimg.image)

        const updatebanner=await BannerModel.findByIdAndUpdate(id,{
            BannerTitle, BannerDescription,image:newimg
        },{new:true})
        if(updatebanner){
            console.log(`banner data is updated`);
            res.redirect('/admin/banner')
        }else{
            console.log(`banner data is not updated`);
        }

    }catch(error){
        console.log(error);

    }
}
// ------------------------Admin Delete Banner------------------//
const Admin_Delete_Banner=async(req,res)=>{
    try{
        const id=req.params.id
    const deletebanner=await BannerModel.findByIdAndDelete(id)
    if(deletebanner){
        console.log(`banner data is deleted`);
        fs.unlinkSync(deletebanner.image)
        res.redirect('/admin/banner')
        
    }else{
        console.log(`banner data is not deleted`);
    }

    }catch(error){
        console.log(error);
    }
}
module.exports = {
    Admin_Post_Banner,
    admin_addbannerpage,
    admin_edit_banner,
    Admin_update_Banner,
    Admin_Delete_Banner
}