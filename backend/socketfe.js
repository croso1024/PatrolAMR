import io from 'socket.io-client';

const socket = io('http://localhost:3000');  // 這裡填寫您的後端服務器地址

socket.on('connect', () => {
  console.log('Connected to server');
  
  socket.emit('socket_test1', 'Hello from client'); // 發送消息到後端

  socket.on("ACK", ()=>{console.log("YA")})
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});