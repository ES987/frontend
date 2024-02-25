import { Component, Input,  ViewChild,  input } from '@angular/core';
import { ArduinoConfiguration, SensorPin, Sensors } from '../../Logic/Entities/Configurations/ArduinoConfiguration';
import { Provider } from '../../Logic/Entities/Provider';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-arduino-configuration',
  templateUrl: './arduino-configuration.component.html',
  styleUrl: './arduino-configuration.component.css'
})
export class ArduinoConfigurationComponent {
  @Input()
  public provider :Provider = new Provider();

  public config:Sensors = new Sensors();
  displayedColumns: string[] = ['Pin', 'Type'];
  dataSource = ELEMENT_DATA;
  sensors:SensorPin[] = [];
  @ViewChild(MatTable) table: any;
  
  constructor(){
     
  }
   

  ngOnDestroy() {
     
  }
  public async ngOnInit(){
    this.config  = this.provider.jsonConfig.sensors;
    var indexedArray: {[key: number]: string} = this.provider.jsonConfig.sensors;
    for (let key in indexedArray) {
      let value = indexedArray[key];
      console.log(key)
      let sensor :SensorPin = new SensorPin();
      sensor.pinNumber = Number(key);
      sensor.type = value;
      this.sensors.push(sensor);
      // Use `key` and `value`
  }
     
  }

  public async AddPin(){
    let sensor :SensorPin = new SensorPin();
    this.sensors.push(sensor);
    this.table.renderRows();
  }

}
