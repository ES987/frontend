import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { Observable, map } from "rxjs";
 


@Injectable()
export class HttpClientHelper{

  private static _headers: HttpHeaders = new HttpHeaders();
    public get headers(): HttpHeaders {
        return HttpClientHelper._headers;
    }
    public set headers(value: HttpHeaders) {
        HttpClientHelper._headers = value;
        
    }
    changed = new EventEmitter<string>()
    constructor(private http :HttpClient){
        
    }
    
    

    public async DeleteRequest(action:string):Promise<any>{
        let p  = await Promise.resolve<any>(new Promise<any>((resolve, reject) => {
             let responce =   this.http.delete<any>(action,{headers: this.headers});
             responce.subscribe(
            (data ) => {
             resolve(data.value);
            },
            (error) => {
                console.log(error);
                alert(error);
              }
            );
        }));

        return await p;

    }

    public async PostRequest2(action:string):Promise<any>{

        let p  = await Promise.resolve<any>(new Promise<any>((resolve, reject) => {
            let rezult:any;
             let responce =   this.http.post<any>(action,{headers: this.headers});
             
             responce.subscribe(
            (data ) => {
                 
             resolve(data.value);
             if (data.isSuccess == false){
                console.log("Ошибка " + data.error.message );
                this.changed.emit(data.error.message);
             }
             if (data.isSuccess == true){
                resolve(true);
             }
             
            },
            (error) => {

                console.log(error);
                this.changed.emit(error.error.message)
              }
            );
                
        }));

        return await p;

    }

    public async PostRequest(action:string,obj:any):Promise<any>{
        let p  = await Promise.resolve<any>(new Promise<any>((resolve, reject) => {
            let rezult:any;

             let responce =   this.http.post<any>(action,obj,{headers: this.headers});
             
             responce.subscribe(
                (data ) => {
                    try{
                        console.log(data);
                        if (data.isSuccess == true && data.value != null){
                            resolve(data.value);
                        }
                    }
                    catch(e){
                        
                    }
                
                if (data.isSuccess == false){
                    console.log("Ошибка " + data.error.message );
                    this.changed.emit(data.error.message);
                }
                if (data.isSuccess == true && data.value == null){
                    resolve(true);
                }
                
                },
                (error) => {
                    console.log("Ошибка");
                    console.log(error);
                    this.changed.emit(`Ошибка: ${error.error.error.message}`)
                }
                );
                
        }));

        return await p;

    }
    public async PutRequest(action:string,obj:any):Promise<any>{

        let p  = await Promise.resolve<any>(new Promise<any>((resolve, reject) => {
            let rezult:any;

             let responce =   this.http.put<any>(action,obj,{headers: this.headers});
             
             responce.subscribe(
                (data ) => {
                resolve(data.value);
                },
                (error) => {
                    console.log(error);
                    alert(error);
                }
            );

        }));

        return await p;

    }

     

    public async GetRequest(action:string):Promise<any>{

        let p  = await Promise.resolve<any>(new Promise<any>((resolve, reject) => {
            let rezult:any;

             let responce =   this.http.get<any>(action ,{headers: this.headers});
             
             responce.subscribe(
            (data ) => {
             resolve(data.result);
            },
            (error) => {
                console.log(error);
                 
              }
            );
        }));
            
        return await p;

    }

}