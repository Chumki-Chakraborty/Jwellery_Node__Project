const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const hashpassword=async(password)=>{
    const saltpassword=10
    const hashpassword=await bcrypt.hash(password,saltpassword)
     return hashpassword

}
// ComparePassword
const ComparePassword=async(password,hashpassword)=>{
    return await bcrypt.compare(password,hashpassword)

}
// jwt_userauth
const jwt_userauth=(req,res,next)=>{
   
    if(req.cookies && req.cookies.usertoken){
        jwt.verify(req.cookies.usertoken,process.env.JWT_SECRET,(err,data)=>{
            req.user=data
          return  next()
        })
    
   }else{
    console.log(`cannot access dashboard page!!Please LogIn first`);
        return next()
   }
}
// ---------------jwt_adminauth---------//
const jwt_adminauth=(req,res,next)=>{
   
    if(req.cookies && req.cookies.admintoken){
        jwt.verify(req.cookies.admintoken,process.env.JWT_SECRET,(err,admindata)=>{
            req.admin=admindata
          return  next()
        })
    
   }else{
    console.log(`cannot access admin dashboard page!!Please LogIn first`);
        return next()
   }
}

module.exports={
    hashpassword,
    ComparePassword,
    jwt_userauth,
    jwt_adminauth
}