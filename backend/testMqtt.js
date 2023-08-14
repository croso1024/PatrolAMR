const mqtt = require("mqtt");

let mqtt_client = mqtt.connect("mqtt://localhost:1883") ; 
mqtt_client.on("connect" , ()=>{
    console.log("Connected broker success");
    mqtt_client.subscribe("we") 
    mqtt_client.on("message" , (topic,msg)=>{
        console.log(`Receive msg from ${topic} , msg:${msg}`);
        // mqtt_client.end();
    })
});

//setInterval( ()=>{console.log("J")}  , 1000 )
