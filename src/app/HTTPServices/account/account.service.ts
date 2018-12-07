import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/Models/loginModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt'


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private headers= new HttpHeaders();

  constructor(private http:HttpClient) {
   }

  Login(credentials:LoginModel):Observable<boolean>{
    return this.http.post("http://localhost:60578/api/login",JSON.stringify(credentials) ,
    {headers:new HttpHeaders({"Content-Type": "application/json"})})
    .pipe(map(response=>{
      let result=<any>response;
      if(result && result.token){
        localStorage.setItem('token',result.token);
        return true;
    }
    return false;
    }));
  }
  Register(credentials:LoginModel):Observable<boolean>{
    return this.http.post("http://localhost:60578/api/register",JSON.stringify(credentials) ,
    {headers:new HttpHeaders({"Content-Type": "application/json"})})
    .pipe(map(response=>{
      let result=<any>response;
      if(result && result.token){
        localStorage.setItem('token',result.token);
        return true;
      }
      return false;
    }));
  }
  LogOut(){
    localStorage.removeItem('token');
  }
  isLoggedIn(){
    let jwtHelper=new JwtHelper();
    let token=localStorage.getItem('token');
    if(!token)
    return false;
    let isExipred=jwtHelper.isTokenExpired(token);
    return !isExipred;

  }
}
