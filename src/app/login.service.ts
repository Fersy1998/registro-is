import { HostListener, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //apiURL:any="http://localhost:3000/";
  apiURL:any="https://repo-is.herokuapp.com/";
  
  x:any="Holis";
  constructor(private httpClient:HttpClient) { }
  public subir(data:any):Observable<any>{
    return this.httpClient.post(`${this.apiURL}api/uploadImage`, data);
  }

  datos(data:any):Observable<any>{
    return this.httpClient.post(`${this.apiURL}api/register`, data);
  }
  public login(body:any):Observable<any>{
    return this.x;
  }
  public getUser(body:any):Observable<any>{
    return this.x;
  }
}

