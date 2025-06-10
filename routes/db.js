const mongoose=require("mongoose")

const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
const userSchema=new Schema({
  email:String,
  password:String,
  firstname:String,
  lastname:String
})
const adminSchema=new Schema({
    email:String,
    password:String,
    firstname:String,
    lastname:String
})
const courseSchema=new Schema({
  title:String,
  discription:String,
  price:Number,
  imageurl:String,
  createrid:ObjectId  
})
const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

const usermodel=mongoose.model("user",userSchema)
const adminmodel=mongoose.model("Admin",adminSchema)
const coursemodel=mongoose.model("Course",courseSchema)
const purchasemodel=mongoose.model("Purchase",purchaseSchema)
module.exports={
    usermodel,
    adminmodel,
    coursemodel,
    purchasemodel
}