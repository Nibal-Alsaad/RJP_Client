import { TVShow } from 'src/app/Models/tvShow';
import { TvShowService } from './../../HTTPServices/tv_show/tv-show.service';
import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/Models/genre';
import { GenreService } from 'src/app/HTTPServices/genre/genre.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  popularGenres:string[]=["Action & Adventure", "Comedy", "Drama"]
  subGenres:Genre[]=[];
  filteredShows:TVShow[]=[];
  topRatedAndFilterdShows:TVShow[]=[];
  filterGenre:Genre;
  isMovie:boolean=false; 
  
  constructor(
    private genreService:GenreService,
    private tvShowService:TvShowService,
    private route:ActivatedRoute){

  }
 ngOnInit(){
   this.genreService.GetTVShowsGenres()
   .pipe(switchMap(res=>{
     this.subGenres=res
     .filter(genre=>this.popularGenres.includes(genre.name));
     return this.route.queryParamMap;   
    }))

    .pipe(switchMap(queryParam=>{
      this.filterGenre=this.subGenres
      .find(item=>item.name==queryParam.get('genres'));
     if(!this.filterGenre)
     return this.filteredShows=[];
     return this.tvShowService.GetTopRateTVShows();

    }))

    .subscribe(showsRes=>{
      this.filteredShows=showsRes
      .filter(show=>show.genre_ids.includes(this.filterGenre.id));
      this.topRatedAndFilterdShows=this.filteredShows
      .filter((show,index)=>{return index<=2});
          
    })
 }
}
