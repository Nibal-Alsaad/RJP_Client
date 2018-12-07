import { Cast } from './../../Models/cast';
import { switchMap } from 'rxjs/operators';
import { TvShowService } from 'src/app/HTTPServices/tv_show/tv-show.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/HTTPServices/movie/movie.service';

@Component({
  selector: 'cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
 materialType:string;
 materialId:number;
 casts:Cast[]=[];
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
      this.casts=creditRes.cast;
    })
  }

}
