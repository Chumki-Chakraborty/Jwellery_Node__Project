const Offermodel=require('../../../model/admin/offer')
const Adminmodel=require("../../../model/user/user_auth")
const path=require('path')
const fs=require('fs')
const admin_offer_page=async(req,res)=>{
    const alloffer=await Offermodel.find()
    try{
        if(alloffer){
            res.render('admin/admin_dashboard/admin_offer',{
                title:"admin offer page",
                offerdata:alloffer,
                DATA:req.admin
            })
        }else{
            console.log(`offer data not found`);
        }

    }catch(error){
        console.log(error);

    }



    // res.render('admin/admin_dashboard/admin_offer',{
    //     title:"admin offer page"
    // })
}
//----------------Add offer Page--------//
const Add_offer_Page=(req,res)=>{
    res.render('admin/admin_dashboard/Addoffer',{
        title:"admin add offer page",
        DATA:req.admin
    })
}
//----------------post offer Page--------//
const post_offer=async(req,res)=>{
    try{
        const{offers}=req.body
        const Addoffer=new Offermodel({
            offers
        })
       if(req.file){
        Addoffer.image=req.file.path

       }
        const saveoffers=await Addoffer.save()
        if(saveoffers){
            console.log(`offers added sucessfully`);
            res.redirect('/admin/offer')
        }else{
            console.log(`error to add offer`);
        }

    }catch(error){
        console.log(error);

    }
}
//----------------edit offer Page--------//
const edit_offer_page=async(req,res)=>{
    try{
        const id=req.params.id
        
        const editoffer=await Offermodel.findById(id)
        if(editoffer){
            res.render('admin/admin_dashboard/editoffer',{
                title:"edit offer ",
                Editoffer:editoffer,
                DATA:req.admin
            })

        }else{
            console.log(`offer is not edited`);
        }

    }catch(error){
        console.log(error);
    }

} 
//----------------update offer Page--------//
const update_offer_page=async(req,res)=>{
    try{
        const id=req.params.id
        const {offers}=req.body
        const newimg=req.file.path
        const offerduplicate_img=await Offermodel.findById(id)
        fs.unlinkSync(offerduplicate_img.image)
        const update_product=await Offermodel.findByIdAndUpdate(id,{
            offers,
            image:newimg
        },{new:true})
        if(update_product){
            console.log(`offer data is updated`);
            res.redirect('/admin/offer')
        }else{
            console.log(`offer is not updated`);
        }
       
    }catch(error){
        console.log(error);

    }
}
//----------------Delete offer Page--------//
const Delete_offer_page=async(req,res)=>{
    try{
        const id=req.params.id
        const Deletedata=await Offermodel.findByIdAndDelete(id)
        if(Deletedata){
            console.log(`offer data is deleted`);
            fs.unlinkSync(Deletedata.image)
            res.redirect('/admin/offer')
        }else{
            console.log(`error to delete data`);
        }

    }catch(error){
        console.log(error);
    }
}
module.exports={
    admin_offer_page,
    Add_offer_Page,
    post_offer,
    edit_offer_page,
    update_offer_page,
    Delete_offer_page
}