const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const UserRoutes=require("../server/routes/UserRoutes");
const messageRoutes=require("../server/routes/messagesRoutes")
const app=express();
const socket=require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",UserRoutes); 
app.use("/api/messages",messageRoutes);
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

app.get("/ping", (_req, res) => {
    return res.json({ msg: "Ping Successful" });
  });

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io=socket(server,{
    cors:{
        origin:"http://localhost:3000",
        credential:true,
    }
});

global.onlineUsers=new Map();
io.on("connection",(socket)=>{
    global.chatSocket=socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket=onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive",data.msg);
        }
    });
});