import { Component, EventEmitter, Input,  Output,  ViewChild,  input } from '@angular/core';
import { Parameter } from '../../Logic/Entities/Parameter';
import { BindingParameter } from '../../Logic/Entities/BindingParameter';
import { Provider, } from '../../Logic/Entities/Provider';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrl: './test-configuration.component.css'
})
export class TestConfigurationComponent {
  @Input()
  public existingParameters:BindingParameter[] = []; //// параметры на которые проставлены соответсвия
   counter:number = 0;
  public channels:number[] = []
  
  @ViewChild(MatTable) table: any;

  @Output() onSelectedParameter = new EventEmitter()

  @Input()
  public provider:Provider = new Provider();

  
  @Output()
  public selectedParameter:BindingParameter = new BindingParameter();
  displayedColumns: string[] = ['channel', 'parBinding'];


  public AddChannel(){
    let par : BindingParameter = new BindingParameter();
    par.providerId = this.provider.id;
    par.channel = this.counter++;
    
    this.existingParameters.push(par);
    this.table.renderRows();
  }

  

  public selectParameter(par : BindingParameter){
    this.selectedParameter = par;
    console.log(this.selectedParameter );
  }
}
