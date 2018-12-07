import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/HTTPServices/movie/movie.service';
import { Movie } from 'src/app/Models/movie';
import { Genre } from 'src/app/Models/genre';
import { GenreService } from 'src/app/HTTPServices/genre/genre.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
 popularGenres:string[]=["Action", "Comedy", "Drama"]
 subGenres:Genre[]=[];
 filteredMovies:Movie[]=[];
 topRatedAndFilterdMovies:Movie[]=[];
 filterGenre:Genre;
 isMovie:boolean=true;

  constructor(
    private genreService:GenreService,
    private movieService:MovieService,
    private route:ActivatedRoute){

  }

  // ngOnInit(){
  //   this.genreService.GetAllGenres()
  //   .subscribe(res=>{
  //     this.subGenres=res
  //     .filter(genre=>this.popularGenres.includes(genre.name))

  //     this.route.queryParamMap.subscribe(queryParam => {
  //     this.filterGenre= res.find(item=>item.name==queryParam.get('genres'));
     
  //     if(this.filterGenre){
  //     this.movieService.GetTopRateMovies()
  //     .subscribe(moviresRes=>{
  //     this.filteredMovies=moviresRes
  //     .filter(movie=>movie.genre_ids.includes(this.filterGenre.id) ) 
  //     this.topRatedAndFilterdMovies=this.filteredMovies
  //     .filter((value,index)=>{return index<=2});   
  //       }      
  //         )           
  //       }
      
  //     })     
  //   });

  // }

  ngOnInit(){
    this.genreService.GetMoviesGenres()
    .pipe(switchMap(res=>{
      this.subGenres=res
      .filter(genre=>this.popularGenres.includes(genre.name));
    return this.route.queryParamMap;
    }))

     .pipe(switchMap (queryParam => {
      this.filterGenre= this.subGenres
      .find(item=>item.name==queryParam.get('genres'));
      if(!this.filterGenre)
      return this.filteredMovies=[];
      return this.movieService.GetTopRateMovies();
   
     }))
   
      .subscribe(moviesRes=>{
      this.filteredMovies=moviesRes
      .filter(movie=>movie.genre_ids.includes(this.filterGenre.id) ) 
      this.topRatedAndFilterdMovies=this.filteredMovies
      .filter((value,index)=>{return index<=2});   
        }      
          )           
        }
  }

