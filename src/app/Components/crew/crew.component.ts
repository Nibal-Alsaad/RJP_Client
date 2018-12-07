import { Crew } from './../../Models/crew';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/HTTPServices/movie/movie.service';
import { TvShowService } from 'src/app/HTTPServices/tv_show/tv-show.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.css']
})
export class CrewComponent implements OnInit {
  materialType:string;
  materialId:number;
  crews:Crew[]=[];
   constructor(
     private route:ActivatedRoute,
     private movieService:MovieService,
     private showService:TvShowService)
      { }
 
   ngOnInit() {
     this.route.paramMap
     .pipe(switchMap(params=>{
       this.materialType=params.get('materialType');
       this.materialId=+params.get('id');
       if(this.materialType=='movie')
       return this.movieService.GetMovieCredit(this.materialId);
       return this.showService.GetTVShowCredit(this.materialId);
     }))
     .subscribe((creditRes)=>{
       this.crews=creditRes.crew;
     })
   }
 
 }