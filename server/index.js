const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserRoutes=require("../server/routes/UserRoutes");
const app=express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",UserRoutes); 
// app.use("/api/messages",messageRoutes);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
})  
.then(()=>{ 
    console.log("DB connection successfull");
})
.catch((err)=>{ 
    console.log("There is error in Db connectin",err.message);
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});
