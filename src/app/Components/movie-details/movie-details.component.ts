import { FullMovie } from './../../Models/fullMovie';
import { KeyWord } from 'src/app/Models/keyWord';
import { Genre } from './../../Models/genre';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './../../Models/movie';
import { Crew } from './../../Models/crew';
import { Cast } from './../../Models/cast';
import { MovieService } from './../../HTTPServices/movie/movie.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

 casts:Cast[]=[];
 featuredCasts:Cast[]=[];
 crews:Crew[]=[];
 featuredCrews:Crew[]=[];
 specialistCrews:string[]=["Director", "Story", "Screenplay"];
 filteredMovie:Movie;
 filteredMovieId:number;
 genres:Genre[]=[];
 keyWords:KeyWord[]=[];
 isDBElement:boolean;
 fMovie: FullMovie;
 isAdded:boolean=false;
 materialType='movie';

  constructor(private route:ActivatedRoute,private movieService:MovieService) { }


  ngOnInit() {
    this.route.paramMap.
    pipe(switchMap(params=>{
      this.filteredMovieId=+params.get('id');
         return this.movieService.GetDBMovieDetails(this.filteredMovieId);
    }))
  .pipe(switchMap(movieRes=>{
    this.filteredMovie=movieRes;
    if(movieRes){
    this.isDBElement=true;
    return this.movieService.GetDBMovieCredit(this.filteredMovieId);}
   else{
    this.movieService.GetMovieDetails(this.filteredMovieId)
    .subscribe(res=>this.filteredMovie=res);
    return this.movieService.GetMovieCredit(this.filteredMovieId);
   }

 }))
     .pipe(switchMap(creditRes=>{
       this.casts=creditRes.cast;
       this.featuredCasts=creditRes.cast.filter(cast=>cast.order<=3);
       this.crews=creditRes.crew;
       this.featuredCrews=creditRes.crew.filter(item=>this.specialistCrews.includes(item.job));
       if(this.isDBElement)
       return this.movieService.GetDBMovieGenres(this.filteredMovieId);
       return this.movieService.GetMovieGenres(this.filteredMovieId);
     }))
    .pipe(switchMap(movieGenresRes=>{
      this.genres=movieGenresRes;
      if(this.isDBElement)
      return this.movieService.GetDBMovieKeyWords(this.filteredMovieId);
      return this.movieService.GetMovieKeyWords(this.filteredMovieId);
    }))
    .subscribe(movieKeyWordRes=>{
      this.keyWords=movieKeyWordRes;
    }
      )
    ;
  }
   createNewEntry(){
     this.fMovie= new FullMovie();
     this.fMovie.movie=this.filteredMovie;
     this.fMovie.genres_collection=this.genres;
     this.fMovie.keyWords_collection=this.keyWords;
     this.fMovie.casts_collection=this.casts;
     this.fMovie.crews_collection=this.crews;
     var result:FullMovie;
     this.movieService.AddDBMovieDetail(this.fMovie)
     .subscribe(res=>result=res);
     this.isAdded=true;
  }
  
}
