import { Component, OnInit } from '@angular/core';
import { TVShow } from 'src/app/Models/tvShow';
import { TvShowService } from 'src/app/HTTPServices/tv_show/tv-show.service';
import { Genre } from 'src/app/Models/genre';

@Component({
  selector: 'top-tv-shows',
  templateUrl: './top-tv-shows.component.html',
  styleUrls: ['./top-tv-shows.component.css']
})
export class TopTvShowsComponent implements OnInit {

  constructor(private tvShowService:TvShowService) {
   }
  allShows:TVShow[]=[];
  topRatedShows:TVShow[]=[];
  movie:boolean=false;
  showGenres:Genre[][]=[];

  ngOnInit() {
    this.tvShowService.GetTopRateTVShows()
  .subscribe(res=>{
    this.allShows=res;
    this.topRatedShows=res.filter((value, index)=>{
      return index <=5;
     });
      if(this.topRatedShows){
        this.topRatedShows.forEach(element => {
        this.tvShowService.GetTVShowGenres(element.id)
          .subscribe(genresRes=> {
            this.showGenres.push(genresRes);
      
      });
      }
    );
    
  }
}); 
  }
}
