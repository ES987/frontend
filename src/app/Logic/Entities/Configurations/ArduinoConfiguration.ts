

export class ArduinoConfiguration {
   public sensors:Sensors = new Sensors();
     
}

export class SensorPin{
   public pinNumber:number=0;
   public type:string = "";
}
export class Sensors{
    //[key: number]: string;
    sensors = new Map<number, string>();
}

