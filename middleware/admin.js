const jwt=require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD}=require("../routes/config")
function adminmiddleware(req,res,next){
   const token=req.headers.token;
   const decoded=jwt.verify(token,JWT_ADMIN_PASSWORD)
   if(decoded){
    req.userid=decoded.id;
    next()
   }else{
    res.json({
        msg:"tou are not signes in"
    })
   }
}
module.exports={
    adminmiddleware:adminmiddleware
}