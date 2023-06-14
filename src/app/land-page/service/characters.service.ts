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

    public delete(id:number):Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/x-www-form-urlencoded');
        return this.http.delete<ResponseModel>(this.url+'characters/delete/'+id,{headers:headers});
    }
    
    public list():Observable<ResponseModel>{
        var headers = new HttpHeaders().set('content-Type', 'application/json');

        return this.http.get<ResponseModel>(this.url+'characters/list',{headers:headers});
    }

}