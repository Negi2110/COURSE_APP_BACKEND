// const express=require("express")
// const router=express.Router;

const{Router}=require("express")
const { usermodel}=require("./db")
const jwt=require("jsonwebtoken")
const {usermiddleware}=require("../middleware/admin")
const userRouter=Router();
const {JWT_USER_PASSWORD}=require("./config")
userRouter.post("/signup",async function(req,res){
    const {email,password,firstname,lastname}=req.body;
    try{
      await usermodel.create({
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

userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const user= await usermodel.findOne({
        email:email,
        password:password
    })
    if(user){
     const token=  jwt.sign({
        id:user._id
     },JWT_USER_PASSWORD)

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

userRouter.get("/purchses",usermiddleware,async function(req,res){
    const userid=req.userid;
    const purchases=await purchasemodel.find({
        userid,
       
   })
   res.json({
       purchases
   })
})

module.exports={
    userRouter:userRouter
}