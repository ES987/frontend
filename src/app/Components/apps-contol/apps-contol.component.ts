import { Component, ElementRef, TemplateRef, ViewChild, ViewContainerRef  } from '@angular/core';
import {MatListModule} from '@angular/material/list';  
import { ConfigurationService } from '../../Logic/Servises/ConfigurationService';
import { HttpClientHelper } from '../../Logic/Helpers/HttpClientHelper';
import { AppEntity } from '../../Logic/Entities/AppEntity';
import { Provider } from '../../Logic/Entities/Provider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Parameter } from '../../Logic/Entities/Parameter';
import { BindingParameter } from '../../Logic/Entities/BindingParameter';
import { ProviderLog } from '../../Logic/Entities/ProviderLog';
@Component({
  selector: 'app-apps-contol',
  templateUrl: './apps-contol.component.html',
  styleUrl: './apps-contol.component.css',
   
  providers:[
    MatListModule,
    HttpClientHelper,
    ConfigurationService
  ]
})
export class AppsContolComponent  {


  public apps:AppEntity[]  = [];
  public providers:Provider[]=[];
  public SelectedProvider:Provider = new Provider();
  public allParameters:Parameter[] = []; // все существующие параметры
  public bindingParameters:BindingParameter[] = [];
  public parameters:Parameter[] = []; /// непроставленные соответсвия
  public logs : ProviderLog[] = [];
  public selectedParameter:BindingParameter = new BindingParameter();

  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: any;
  @ViewChild("content", {read: TemplateRef}) contentRef: any;
 
  @ViewChild('logsList') logsList: any;
 

  displayedColumns: string[] = ['date', 'log'];
  constructor(private _service:ConfigurationService){
    
    let intervalId = setInterval(() => {
      /// скролить и запрашивать только в том случае если пользователь на конце списка логов
      // тоесть процент скрола меньше 95
      let currentHeight = this.logsList.nativeElement.scrollTop + 1000 ;
      let maxHeight = this.logsList.nativeElement.scrollHeight;
      var result = (currentHeight / maxHeight) * 100 ;

      if (result<95){
        return;
      }

      if (this.SelectedProvider.id != ""){
        console.log("Запрос логов");
        let numbers = this.logs.map(function(o) { return o.nanoSeconds; });
        console.log("Поиск макс. числа"  );
       let max =  Math.max.apply(Math, numbers)

        this._service.GetProviderLogs(this.SelectedProvider.id,max + 1000).then((data) => {
          data.forEach(item => {
            this.logs.push(item);
             
          });
          this.scrollToBottom();
          
          
        });
      }
            
  }, 1000)
  }
  ngAfterContentInit() {
    this.outletRef.createEmbeddedView(this.contentRef);
  }
  scrollToBottom(): void {
    try {
        this.logsList.nativeElement.scrollTop = this.logsList.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  private rerender() {
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
  }

  public scroll(event:any){
    
    

     
  }

  public async ngOnInit(){
   this.apps  = await  this._service.GetApps();
   this.allParameters = await this._service.GetParameters();
   
   
  }

  public async GetProviders(appId:string){
    this.logs = [];
    this.providers = await this._service.GetProviders(appId);
    this.providers.forEach(element => {
      element.enable = !element.isStoped;
    });
    
  }
  
  public async SelectProvider(provider:Provider){
    this.logs = [];
    this.SelectedProvider = provider;
    this.bindingParameters = await this._service.GetBidingParameters(this.SelectedProvider.id);
    
    this.logs = await this._service.GetProviderLogs(this.SelectedProvider.id);
    this.scrollToBottom();
    
    this.bindingParameters.forEach(item  => {
       let find = this.allParameters.find(par => {
        return par.id == item.id;
      })?.name

      if (find != undefined){
        item.name = find;
        
      }
    })
    this.parameters = this.allParameters.filter(par => !this.bindingParameters.some(w => w.id == par.id) );
     
    this.rerender();
  } 

  public async AddBinding(parameter:Parameter){
    let par :BindingParameter = new BindingParameter();
    if (this.selectedParameter.channel != 0){
      par.parameterId = parameter.id;
      par.providerId = this.SelectedProvider.id;
      par.channel = this.selectedParameter.channel;
      par.name = parameter.name;
      let id:number =  await this._service.AddBindingParameter(par);
      par.id = id;
      this.bindingParameters.push(par);
      this.rerender();
    }
    else console.log("channel = 0");
    
     
  }
public selectParameter(par:BindingParameter){
       
     this.selectedParameter = par;
     
    // console.log(this.selectedParameter );
  }
  public async EnableProvider(enable:boolean,providerId:string){
    console.log(enable);
    if(enable == true){
      this._service.StartProvider(providerId);
    }
    else{
      this._service.StopProvider(providerId);
    }
  }

}
