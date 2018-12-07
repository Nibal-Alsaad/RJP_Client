import { AccountService } from './HTTPServices/account/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private accountService:AccountService){}
  title = 'ClientAPP';

  logOut(){
  this.accountService.LogOut();
  }
}
