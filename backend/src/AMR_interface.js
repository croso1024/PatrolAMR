/*

    - AMR_interface is a pre-define procedure to handle the message 
    from the robots and in/out the backend

    - based-on the MQTT protocol , the receive and publish work will 
    request the mqtt client that passed in advance

    - all of the callback  use reference to create the new state and replace the 
    original object proerties , don't access and modify origin props directly ! 
*/



const CallbackArray = {
    "status": statusCallback , 
    "alarm_vehicle":null , 
    "receive_task":null , 
    "complete_trajectory":null , 
    "complete_task":null , 
    "self_return":null , 
}; 
const callbackIndex = Object.keys(CallbackArray);

class CallBackError extends Error {} 

function Mqtt_Callback ( topic , msg , api_interface , content ) {
    
    let index = callbackIndex.indexOf(topic) ; 
    if (index >= 0){
        CallbackArray[Object.keys(CallbackArray)[index]](msg ,api_interface , content)
    }
    else {
        throw CallBackError(`Unknown topic ${topic}, no corresponding callback`)
    }

}

export default Mqtt_Callback ;



// 0819 - 確認了一下目前的方法 , 將通訊API包在api_interface 可以正常使用通訊 
// Global的狀態包在content，content之後可能可以換成其他集成物件 {FMS_System , ...} 
// 使得擴展性上只需要處理content上的內容


function statusCallback(msg, api_interface , content){
    let {vehicle_status} = content ; 
    vehicle_status.val = JSON.parse(msg) ; 
    content.vehicle_status = vehicle_status ;
    console.log(content)
    api_interface["Socket"].emit("WEWE",222)
    api_interface["MQTT"].publish("tepu" ,JSON.stringify(36))
}

