const {Router}=require("express")
const jwt=require("jsonwebtoken")
const adminRouter=Router();
const {adminmodel, coursemodel}=require("./db")
const {adminmiddleware}=require("../middleware/admin")
const {JWT_ADMIN_PASSWORD}=require("./config")
adminRouter.post("/signup",async function(req,res){
     const {email,password,firstname,lastname}=req.body;
       try{
         await adminmodel.create({
           email:email,
           password:password,
           firstname:firstname,
           lastname:lastname
         })
       }catch(e){
           res.json({
               msg:"eroor occurs"
           })
       }
       res.json({
          msg:"signup succeeded"
       })
})

adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const admin= await adminmodel.findOne({
        email:email,
        password:password
    })
    if(admin){
     const token=  jwt.sign({
        id:admin._id
     },JWT_ADMIN_PASSWORD)

     res.json({
        token:token
     })
    }else{
        res.json({
            msg:"incorrect credentials"
        })
    }
   res.json({
       msg:"you have signes in"
   })
})
adminRouter.post("/course",adminmiddleware,async function(req,res){
    const adminid=req.userid;
    const {title,description,imageurl,price}=req.body;
   const course= await coursemodel.create({
        title:title,
        description:description,
        imageurl: imageurl,
        price: price,
        createrid:adminid
    })
    res.json({
        msg:"you have created course",
        courseid:course._id
    })
 })
 adminRouter.put("/course",adminmiddleware,async function(req,res){
    
    const adminid=req.userid;
    const {title,description,imageurl,price,courseid}=req.body;
   const course= await coursemodel.updateOne({ 
  _id:courseid,
    createrid:adminid
   },{
        title:title,
        description:description,
        imageurl: imageurl,
        price: price
    })
    res.json({
        msg:"you have updated course",
        courseid:course._id
    })
    
 })
 adminRouter.get("/course/bulk",adminmiddleware,async function(req,res){
    const adminid=req.userid;
    const course= await coursemodel.find({ 
        _createrid:adminid
         
        });
    res.json({
        msg:"you have creayed course",
        course
    })
 })
 module.exports={
    adminRouter:adminRouter
 }

