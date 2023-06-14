import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../model/response.model";
import { Observable } from "rxjs";
import { CharacteresDto } from "../dto/characteres.dto";


@Injectable({
    providedIn:'root'
})
export class CharacteresService{

    private url:string;

    constructor(private http:HttpClient){
        this.url=environment.api;
    }

    public save(characteresDto:CharacteresDto):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.post<ResponseModel>(this.url+'characters/save',JSON.stringify(characteresDto),{headers:headers});
    }
    public editar(characteresDto:CharacteresDto):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.put<ResponseModel>(this.url+'characters/edit',JSON.stringify(characteresDto),{headers:headers});
    }
        
    public findById(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');
        return this.http.get<ResponseModel>(this.url+'characters/findById/'+id,{headers:headers});
    }

}