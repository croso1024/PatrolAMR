// Server of the Patrol AMR  
// Use MQTT for communicate with AMR , and connect the React front-end by socket.io 
import * as mqtt from "mqtt";
import { Server } from "socket.io";
import { createServer } from "http"; 
const http_server = createServer() ; 
const Mqtt_Callback = require("./MQTT_callback");
const socket_server = new Server(http_server) ; 

// ------------------  MQTT Server Settup ------------------
let mqtt_client = mqtt.connect("mqtt://localhost:1883") ; 
const AMR_OCC_topic = {
    "test1" :{qos:0} , 
    "test2" :{qos:0} , 
    "test3" :{qos:0}, 
    "test4" :{qos:0}, 
}

mqtt_client.on("connect" , ()=>{

    console.log("Connected broker success");

    mqtt_client.subscribe(
        AMR_OCC_topic , (error,success) => {
            if (error) {console.log(`subscribe error ${error}`)} 
            else{ 
                success.forEach(
                    (info , index) => console.log(`Subscribe the topic(${index}) ${info.topic} with qos : ${info.qos}`)
                )
             }
        }
    ) ; 

    mqtt_client.on("message", Mqtt_Callback) ; 
});



// ------------------  Socket.IO server setting ------------------

socket_server.on("connect" , (socket)=>{
    console.log("A new client connect  to socket server !") ; 

    socket.on("socket_test1" , (msg) =>{
        console.log("Receive msg from socket_test1" ,msg ); 
        socket.emit("ACK" , "Receive msg") ; 
    })


})


http_server.listen(3000 , ()=>{
    console.log(`Socket server on , listen :${3000}`); 
})









function Mqtt_Callback ( topic , msg , packet) {
    if (topic === "test1") {
       handle_test1(msg.toString())
    }
    else if (topic === "test2") {
        handle_test2(msg)
    }
    else if (topic === "test3") {
        
    }
}

function handle_test1( msg )
{
    console.log("Test1",msg)
}
function handle_test2( msg )
{
    console.log("Test2",msg)
}
