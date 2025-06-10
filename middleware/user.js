const jwt=require("jsonwebtoken")
const {JWT_USER_PASSWORD}=require(".routes/config")
function usermiddleware(req,res,next){
   const token=req.headers.token;
   const decoded=jwt.verify(token,JWT_USER_PASSWORD)
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
    usermiddleware:usermiddleware
}