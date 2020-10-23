require('dotenv').config()
const express = require("express");
const http = require("http");
const app = express();
const db = require('./database/connect')
const cors = require('cors');
app.use(cors())
app.use(express.json());
db.connectOnce();

//declare routes
const boardRoute = require('./components/Boards/board.route');
const userRoute = require('./components/Users/user.route')

//use routes
app.use('/board',boardRoute)
app.use('/user',userRoute)
const server = http.createServer(app);
const port = 3001;
server.listen(port);
