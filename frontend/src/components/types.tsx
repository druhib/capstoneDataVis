export default interface NodeData {
    id: string;
    latitude: number; 
    longitude: number; 
    UUID: string;
    advertisingName: string;
    data: {
        temp: number[],
        humidity: number[],
        gas: number[],
        accelX: number[],
        accelY: number[],
        accelZ: number[],
        
    };

}

