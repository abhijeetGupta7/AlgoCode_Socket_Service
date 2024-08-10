const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { PORT } = require("./config/server.config");
const Redis = require("ioredis");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());

const redisCache = new Redis();        // redis to use as a cache 

const httpServer = createServer(app);
const io = new Server(httpServer, {         // io socket server: here in the second paramter, we have to configure the cors
  cors:{
    origin:"http://localhost:5500",
    methods:["GET","POST"]
  }
 });

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on('setUserId',(userId)=>{
    redisCache.set(userId,socket.id);           // using redisCache to store the { userId -> socketId }
    console.log(`${userId} ${socket.id}`);
  });

  socket.on("fetchId",(userId)=>{
    redisCache.get(userId, (err, result) => {
      if (err) console.error(err);
      else socket.emit("getId",result);
    });
  });
});

app.post("/sendPayload",async (req,res)=>{     
  const {userId,payload}=req.body;
  if(!userId || !payload) {
    res.status(400).send("Invalid Request");
  }
  
  console.log(payload);
  
  const socketId=await redisCache.get(userId);
  console.log(socketId);
  if(socketId) {
    io.to(socketId).emit('receiveResPayload',payload); // impt:  io.to(socketId).emit(event,msg) is used to send the msg to a specific socket only i.e. to a specific client/target room
    res.send("Payload sent successfully")
  } else {
    res.status(404).send("User not found");
  }
});


httpServer.listen(8050, ()=>{
    console.log(`Server is listening at ${PORT}`);
    
});