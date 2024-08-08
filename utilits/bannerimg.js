const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        let ext=path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})
const banner_img=multer({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(
            file.mimetype=='image/png',
            file.mimetype=='image/jpg',
            file.mimetype=='image/jpeg'
        ){
            cb(null,true)
        }else{
            console.log(`select valid file folder`);
            cb(null,false)
        }
    },limits:{
        fieldSize:1024*1024*2
    }
})

// 
// const multer=require('multer')
// const path=require('path')
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//         let ext=path.extname(file.originalname)
//         cb(null,Date.now()+ext)
//     }

// })
// const uploadimg=multer({
//     storage:storage,
//     fileFilter:(req,file,callback)=>{
//         if(
//             file.mimetype=='image/png',
//             file.mimetype=="image/jpg",
//             file.mimetype=="image/jpeg"
//         ){
//             callback(null,true)
//         }else{
//             console.log(`please select valid file format`);
//             callback(null,false)
//         }
//     },limits:{
//         fieldSize:1024*1024*2
//     }

// })
// module.exports=uploadimg

 module.exports=banner_img