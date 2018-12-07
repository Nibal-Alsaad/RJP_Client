import { MovieService } from 'src/app/HTTPServices/movie/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { Genre } from 'src/app/Models/genre';

@Component({
  selector: 'premiere',
  templateUrl: './premiere.component.html',
  styleUrls: ['./premiere.component.css']
})
export class PremiereComponent implements OnInit {

  constructor(private movieService:MovieService) { 
    this.isMovie=true;
  }
 premieresMovies:Movie[]=[];
 movieGenres:Genre[][]=[];
 isMovie:boolean=true;

  ngOnInit() {
    this.movieService.GetPremieresMovies()
    .subscribe(res=>{
      this.premieresMovies=res;
    if(this.premieresMovies.length>0){
    this.premieresMovies.forEach((element)=>{
    this.movieService.GetMovieGenres(element.id)
    .subscribe(genresRes=>
      this.movieGenres.push(genresRes)
      )
    }
    ) ;
  }

  });
}
  

}
