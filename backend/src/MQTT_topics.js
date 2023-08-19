// Provides the topics object and all template of topic content 


export const mqtt_qos =  1 ; 

export const AMR_TO_OCC = {

    "status" : {
        "battery":{"soc":null ,"voltage":null},
        "position":{"lat":null , "lon":null},
        "velocity":null ,
        "remaining_distance":null 
    } , 

    "alarm_vehicle" : {"typy":null} , 

    "receive_task" : {"uuid":null , "acceptence":null} , 

    "complete_trajectory" : {"uuid":null} , 

    "complete_task" : {"uuid":null , "location":null} , 

    "self_return" : {"uuid":null , "location":null} 
 
}

export const OCC_TO_AMR = {
    "task": {
        "trajectory":null ,
        "uuid":null , 
        "mode":null , 
        "end_time":null , 
    } , 

    "return": {"uuid":null , "location":null} ,

    "tuv_tripodhead":{"direction":null , "value":null} , 

    "alarm_occ":{"type":null}
}


