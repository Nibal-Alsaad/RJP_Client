import { AccountService } from 'src/app/HTTPServices/account/account.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private accountService:AccountService,private router:Router) { }

  canActivate(){
   if(this.accountService.isLoggedIn()) 
   return true;
  this.router.navigate(["login"]);
  return false;
  }
}
