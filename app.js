const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
//routes
const direct=require("./routes/direct")

// my vars
const port = process.env.PORT || 3000;
const {MONGO_URL} = require('./config/');
require('./libs/db-connection');
// configuration
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: 'abc123',
  resave: true,
  saveUninitialized: true,
  // this prevents that every time the server is restarted we lose the login sessions
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: MONGO_URL,
    autoReconnect: true
  })
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.errors = [];
  next();
})
// static files
app.use(express.static(path.join(__dirname, '/public')));
// engine
app.set('view engine', 'jade');
// passport config
require('./config/passport')(passport);
//image 
app.use("/image/",express.static("./uploads"))
// routes
app.use(require('./routes/')); // main routes
app.use('/user', require('./routes/user')); // user routes
app.use('/direct',direct)

//socket 
const io=require("socket.io")(server);


io.on("connection",(socket)=>{
  //when users connects
  socket.emit("message","A user has joined the Chat");


  //when users Dis-connects
  socket.on("disconnect",()=>{
    socket.on("room",(room)=>{
      io.sockets.in(room).emit("message",("A user has left the chat"));
    })
  });

  //listen for message
  socket.on("message",(message)=>{
    socket.on("room",(room)=>{
      socket.join(room)
      console.log(room)
      io.sockets.in(room).emit('message',message)
      //io.emit("message",message);
    
    })
      
  });
});

// run server
server.listen(port, () => console.info(`Server on Fire @${port}`));