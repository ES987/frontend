import { Injectable } from "@angular/core";
import { AppEntity } from "../Entities/AppEntity";
import { HttpClientHelper } from "../Helpers/HttpClientHelper";
import { Provider } from "../Entities/Provider";
import { Parameter } from "../Entities/Parameter";
import { BindingParameter } from "../Entities/BindingParameter";
import { ProviderLog } from "../Entities/ProviderLog";


@Injectable()
export class ConfigurationService{

    constructor(private _client:HttpClientHelper){
        
    }
    public async GetApps() : Promise<AppEntity[]>{
      let response = await  this._client.GetRequest("/api/conf/Programs");
      return  response;
    }

    public async GetProviders(idApp:string) :Promise<Provider[]>{
        let response = await  this._client.GetRequest(`/api/conf/Providers/ByProgram?programId=${idApp}`);
      return  response;
    }

    public async StartProvider(id:string){
      let request:string = `/api/conf/Providers/StartProvider?providerId=${id}`;
      await this._client.PostRequest(request,{})
    }

    public async StopProvider(id:string){
      let request:string = `/api/conf/Providers/StopProvider?providerId=${id}`;
      await this._client.PostRequest(request,{})
    }

    public async AddBindingParameter(par :BindingParameter):Promise<number>{
      let request:string = `/api/conf/ParametersBinding`;
      let  id = await this._client.PostRequest(request, par);
      return id;
    }

    public async GetParameters() :Promise<Parameter[]>{
      let request = "/api/conf/Parameters";
      return this._client.GetRequest(request); 
    }

    public async GetProviderLogs(providerId:string,start:number = 0) : Promise<ProviderLog[]>{
      let request:string = `/api/conf/Logs/ProviderLogs?providerId=${providerId}&start=${start}`;
      
      console.log("Запрос логов для провайдера " + providerId);
      let logs: ProviderLog[] = await  this._client.GetRequest(request);
      logs.forEach(log => {
        switch(log.logLevel){
          case "error":
            log.color = "#f5001d";
            break;
            case "warn":
            log.color = "#f5c800";
            break;
            case "info":
            log.color = "#5e5d5a";
            break;
        }
      })
      return logs;
    }

    public async GetBidingParameters(poviderId:string):Promise<BindingParameter[]>{
      let request:string = `/api/conf/ParametersBinding/ByProvider?providerId=${poviderId}`;
      return this._client.GetRequest(request);
    }

     
}