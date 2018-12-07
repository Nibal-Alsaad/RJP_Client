import { TvShowService } from './../../HTTPServices/tv_show/tv-show.service';
import { FullTVShow } from 'src/app/Models/fullTVShow';
import { TVShow } from './../../Models/tvShow';
import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/Models/cast';
import { Crew } from 'src/app/Models/crew';
import { Genre } from 'src/app/Models/genre';
import { KeyWord } from 'src/app/Models/keyWord';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tv-show-details',
  templateUrl: './tv-show-details.component.html',
  styleUrls: ['./tv-show-details.component.css']
})
export class TvShowDetailsComponent implements OnInit {

  casts:Cast[]=[];
  featuredCasts:Cast[]=[];
  crews:Crew[]=[];
  featuredCrews:Crew[]=[];
  specialistCrews:string[]=["Director", "Story", "Screenplay"];
  filteredShow:TVShow;
  filteredShowId:number;
  genres:Genre[]=[];
  keyWords:KeyWord[]=[];
  firstAirDate:number;
  isDBElement:boolean;
  fTVShow: FullTVShow;
  isAdded:boolean=false;
  materialType='tv';
  
   constructor(private route:ActivatedRoute,private showService:TvShowService) { }
 
   ngOnInit() {
     this.route.paramMap.
     pipe(switchMap(params=>{
       this.filteredShowId=+params.get('id');
       return this.showService.GetDBTVDetails(this.filteredShowId);
     }))
      .pipe(switchMap(showRes=>{
        this.filteredShow=showRes;

        if(showRes){
          this.isDBElement=true;
          return this.showService.GetDBTVCredit(this.filteredShowId);}
         else{
          this.showService.GetTVShowDetails(this.filteredShowId)
          .subscribe(res=>this.filteredShow=res);
          return this.showService.GetTVShowCredit(this.filteredShowId);
         }

     }))
     .pipe(switchMap(creditRes=>{
       this.casts=creditRes.cast;
       this.featuredCasts=creditRes.cast.filter(cast=>cast.order<=3);
       this.crews=creditRes.crew;
       this.featuredCrews=creditRes.crew.filter(item=>this.specialistCrews.includes(item.job));
       this.firstAirDate=new Date(this.filteredShow.first_air_date).getFullYear();
       if(this.isDBElement)
       return this.showService.GetDBTVGenres(this.filteredShowId);
       return this.showService.GetTVShowGenres(this.filteredShowId);
     }))
     .pipe(switchMap(showGenresRes=>{
       this.genres=showGenresRes;
       if(this.isDBElement)
       return this.showService.GetDBTVKeyWords(this.filteredShowId);
       return this.showService.GetTVShowKeyWords(this.filteredShowId);
     }))
     .subscribe(showKeyWordRes=>{
       this.keyWords=showKeyWordRes;

     }
       )
     ;
   } 
   createNewEntry(){
    this.fTVShow= new FullTVShow();
    this.fTVShow.tvShow=this.filteredShow;
    this.fTVShow.genres_collection=this.genres;
    this.fTVShow.keyWords_collection=this.keyWords;
    this.fTVShow.casts_collection=this.casts;
    this.fTVShow.crews_collection=this.crews;
    var result:FullTVShow;
    this.showService.AddDBTVDetail(this.fTVShow)
    .subscribe(res=>result=res);
    this.isAdded=true;
 }
 }