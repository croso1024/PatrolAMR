// Server of the Patrol AMR  
// Use MQTT for communicate with AMR , and connect the React front-end by socket.io 
import * as mqtt from "mqtt";
import { Server } from "socket.io";
import { createServer } from "http"; 
import Mqtt_Callback from "./src/AMR_interface.js"; 
import { mqtt_qos , AMR_TO_OCC as A2O , OCC_TO_AMR as O2A } from "./src/MQTT_topics.js";

const http_server = createServer() ; 
const socket_server = new Server(http_server) ; 

// ------------------  MQTT Server Settup ------------------
let mqtt_client = mqtt.connect("mqtt://localhost:1883") ; 

let api_interface = {
    "MQTT" : mqtt_client , 
    "Socket": socket_server , 
}

let content = {
    vehicle_status : {val:20}
}

mqtt_client.on("connect" , ()=>{

    console.log("Connected broker success !") ; 

    mqtt_client.subscribe(

        [...Object.keys(A2O) ,...Object.keys(O2A)] ,{qos:mqtt_qos}, (error , success) => {
            if (error) {console.log(`Subscribe error ${error}`)} 
            else {
                success.forEach(
                    (info , index) => {console.log(`Subscriber the topic ${index} ${info.topic} with qos ${info.qos}`)}
                )
            }
        }
    );

    mqtt_client.on("message", (topic , message)=>{
        Mqtt_Callback(topic , message ,api_interface ,content)
    });
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




