import { Component ,Input} from '@angular/core';
@Component({
  selector: 'material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.css']
})
export class MaterialCardComponent  {

  constructor() { }

  @Input ('material') material:any;
  @Input ('genres') genres:any[];
  @Input ('isMovie') isMovie:boolean;

}
