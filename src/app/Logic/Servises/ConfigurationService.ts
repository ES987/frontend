import { Injectable } from "@angular/core";
import { AppEntity } from "../Entities/AppEntity";
import { HttpClientHelper } from "../Helpers/HttpClientHelper";
import { Provider } from "../Entities/Provider";
import { Parameter } from "../Entities/Parameter";
import { BindingParameter } from "../Entities/BindingParameter";


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

    public async GetBidingParameters(poviderId:string):Promise<BindingParameter[]>{
      let request:string = `/api/conf/ParametersBinding/ByProvider?providerId=${poviderId}`;
      return this._client.GetRequest(request);
    }

     
}