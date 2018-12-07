import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/HTTPServices/movie/movie.service';
import { Movie } from 'src/app/Models/movie';
import { Genre } from 'src/app/Models/genre';

@Component({
  selector: 'top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css']
})
export class TopMoviesComponent implements OnInit {

  constructor(private movieService:MovieService) {
    this.isMovie=true;
   }
  allMovies:Movie[]=[];
  topRatedMovies:Movie[]=[];
  isMovie:boolean=true;
  movieGenres:Genre[][]=[];
  
  ngOnInit() {
    this.movieService.GetTopRateMovies()
  .subscribe(res=>{
    this.allMovies=res;
    this.topRatedMovies=res.filter((value, index)=>{
      return index <=5;
     });
      if(this.topRatedMovies){
        this.topRatedMovies.forEach(element => {
        this.movieService.GetMovieGenres(element.id)
        .subscribe(genresRes=> 
          this.movieGenres.push(genresRes)
      );
      }
    );
    
  }
});
 }
}