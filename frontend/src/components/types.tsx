export interface NodeData {
    id: string;
    latitude: number; 
    longitude: number; 
    UUID: string;
    advertisingName: string;
    time: string;
    
    data: {
        originID: number
        temp: number[],
        humidity: number[],
        gas: number[],
        accelX: number[],
        accelY: number[],
        accelZ: number[],
        
    };

}

