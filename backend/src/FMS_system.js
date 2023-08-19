/*
    Define the Class of Fleet management system , 

    -- Only handle the fleet status and task , not task ACK or communication ---

    The status of vehicle include but not limited : 
    
        1. Vehicle 
        - position : lat , lon ( maybe OGM pos future !?)
        - battery state
        - velocity
        - task_progress

        2. Task
        - trajectory 
        - uuid 
        - mode (mission type , once or cycle )
        - end_time ( mission end time , format TBD)

*/


class FMS_system {

    constructor() {}

    // receive a new take into queue 
    addMission() {}

    // update fllet states frquently
    updateVehicleState(){}

    // get Next Mission for specific vehicle
    getNextMission(){} 

    // delete mission (maybe need)
    deleteMission(){}

    // Receive Alarm from the vehicle/CV-module ...
    raiseAlarm(){}

}