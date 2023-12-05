const express = require("express");
const { join } = require("path")
const app = express();
const http = require('node:http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);


app.get("/", (req, res)=>{
    res.sendFile(join(__dirname, 'index.html'));
})


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); 
    });
    socket.on('user typing', () => {
        socket.broadcast.emit('show typing status'); 
    });
    socket.on('stop typing', () => {
        socket.broadcast.emit('clear typing status'); 
    });
});


server.listen("3000", () => {
    console.log("Listening on 3000");
})