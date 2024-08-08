const Productmodel=require('../../../model/admin/admin_product')
const Adminmodel=require("../../../model/user/user_auth")
const path=require('path')
const fs=require('fs')
// ----------------- Product Page-------------//
const Product_page=async(req,res)=>{
    try{
        const GetProduct=await Productmodel.find()
        if(GetProduct){
            res.render('admin/admin_dashboard/product',{
                title:'admin product page',
                allproduct:GetProduct,
                DATA:req.admin
            })
        }else{
            console.log(`product details are not found`);
        }

    }catch(error){
        console.log(error);

    }

    
}
// -----------------Add Product-------------//
const Addproduct_page=async(req,res)=>{
    try{
       
        res.render('admin/admin_dashboard/Addproduct',{
            title:'admin add product page',
            DATA:req.admin
        })

    }catch(error){
        console.log(error);
    }
}
// -----------------post Product-------------//
const Admin_post_product=async(req,res)=>{
    // console.log(req.body);
    try{
        const{Productname,productDetails,productPrice}=req.body
        const Addproduct=new Productmodel({
            Productname,productDetails,productPrice
        })
        if(req.file){
            Addproduct.images=req.file.path 
        }
        const saveproduct=await Addproduct.save()
        if(saveproduct){
            console.log(`product added sucessfully`);
            res.redirect('/admin/product')
        }else{
            console.log(`error to add product`);
            res.redirect('/admin/addproduct')
        }

    }catch(error){
        console.log(`error`);
    }
}
// -----------------Edit Product-------------//
const Admin_edit_Product=async(req,res)=>{
    try{
        const id=req.params.id
        const EditProduct=await Productmodel.findById(id)
        if(EditProduct){
            res.render('admin/admin_dashboard/editproduct',{
                title:'admin edit product page',
                Edit:EditProduct,
                DATA:req.admin
            })
        }else{
            console.log(`product not edited`);
        }

    }catch(error){
        console.log(error);
    }

}
// -----------------Edit Product-------------//
const Admin_Update_Product=async(req,res)=>{
    try{
        const{Productname,productDetails,productPrice}=req.body
        const id=req.params.id
        
        const Newimg=req.file.path
        const Pro_duplicateImg=await Productmodel.findById(id)
        fs.unlinkSync(Pro_duplicateImg.images)
        const Updateproduct=await Productmodel.findByIdAndUpdate(id,{
            Productname,productDetails,productPrice,images:Newimg
        })
        if(Updateproduct){
            console.log(`product has been updated`);
            res.redirect('/admin/product')
        }else{
            console.log(`error to update product`);
        }

    }catch(error){
        console.log(error);
    }
}
// -----------------Delete Product-------------//
const Admin_delete_product=async(req,res)=>{
    try{
        const id=req.params.id
        const deleteproduct=await Productmodel.findByIdAndDelete(id)
        if(deleteproduct){
            console.log(`product data has been deleted`,deleteproduct);
            fs.unlinkSync(deleteproduct.images);
            res.redirect('/admin/product');
        }else{
            console.log(`error to delete product data`);
        }

    }catch(error){
        console.log(error);

    }
}


module.exports={
    Product_page,
    Addproduct_page,
    Admin_post_product,
    Admin_edit_Product,
    Admin_Update_Product,
    Admin_delete_product
}