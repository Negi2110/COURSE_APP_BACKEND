const express=require("express")
require("dotenv").config();
console.log(process.env.Mongo_url)
const mongoose=require("mongoose")
const {userRouter}=require("./routes/user")
const {courseRouter}=require("./routes/course")
const {adminRouter}=require("./routes/admin")
const app=express();
app.use(express.json());
app.use("/admin",adminRouter)
app.use("/user",userRouter);
app.use("/course",courseRouter);

;

async function main(){
    await  mongoose.connect(process.env.Mongo_url)
}

main();


app.listen(3000);