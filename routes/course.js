const {Router}=require("express")
const { purchasemodel, usermodel, coursemodel}=require("./db")
const {usermiddleware}=require("../middleware/admin")
courseRouter=Router();
courseRouter.post("/purchase",usermiddleware,async function(req,res){
    const userid=req.userid;
    const courseid=req.body.courseid;
    await purchasemodel.create({
         userid,
         courseid
    })
    res.json({
        msg:"your course have been purchased"
    })
})
courseRouter.get("/preview",async function(req,res){
    const course=await coursemodel.find({})
    res.json({
        msg:"signup endpoint",
        course
    })
})
module.exports={
    courseRouter:courseRouter
}