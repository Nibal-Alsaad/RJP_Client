import { KeyWord } from './../../Models/keyWord';
import { FullMovie } from './../../Models/fullMovie';
import { Movie } from './../../Models/movie';
import { Credit } from './../../Models/credit';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Genre } from 'src/app/Models/genre';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { KeyWordResponse } from 'src/app/Models/ResponseModels/movieKeyWordResponse';
import { PremieresMoviesResponse } from 'src/app/Models/ResponseModels/premieresMoviesResponse';
import { MovieGenresResponse } from 'src/app/Models/ResponseModels/movieGenresResponse';
import { TopRateMoviesResponse } from 'src/app/Models/ResponseModels/topRateMoviesResponse';
import { tmdb } from 'src/app/APIConfig'
import { server_api } from 'src/app/APIConfig'


@Injectable({
  providedIn: 'root'
})
export class MovieService { 

 private headers= new HttpHeaders();

  constructor(private http:HttpClient) {
   }
GetTopRateMovies():Observable<Movie[]>{
  return this.http.get<TopRateMoviesResponse>(tmdb.api+"3/discover/movie?api_key="+tmdb.api_key+"&sort_by=vote_average.desc&page=1")
  .pipe(map(response=><Movie[]>response.results));
}
GetMovieGenres(movie_Id):Observable<Genre[]>{
  return this.http.get<MovieGenresResponse>(tmdb.api+"3/movie/"+movie_Id+"?&api_key="+tmdb.api_key)
  .pipe(map(response=><Genre[]>response.genres));
}
GetPremieresMovies():Observable<Movie[]>{
  return this.http.get<PremieresMoviesResponse>(tmdb.api+"3/movie/now_playing?api_key="+tmdb.api_key)
  .pipe(map(response=><Movie[]>response.results));
}
GetMovieDetails(movie_Id):Observable<Movie>{
  return this.http.get(tmdb.api+"3/movie/"+movie_Id+"?&api_key="+tmdb.api_key)
  .pipe(map(response=><Movie>response));
}
GetMovieCredit(movie_Id):Observable<Credit>{
 return this.http.get(tmdb.api+"3/movie/"+movie_Id+"/credits?api_key="+tmdb.api_key)
 .pipe(map(response=><Credit>response));
}
GetMovieKeyWords(movie_Id):Observable<KeyWord[]>{
  return this.http.get<KeyWordResponse>(tmdb.api+"3/movie/"+movie_Id+"/keywords?api_key="+tmdb.api_key)
  .pipe(map(response=><KeyWord[]>response.keywords));
}
GetDBMovieDetails(movie_Id):Observable<Movie>{
  return this.http.get(server_api.api+"Movie/"+movie_Id)
  .pipe(map(response=><Movie>response));
}
GetDBMovieGenres(movie_Id):Observable<Genre[]>{
  return this.http.get(server_api.api+"Movie/"+movie_Id+"/Genres")
  .pipe(map(response=><Genre[]>response));
}
GetDBMovieCredit(movie_Id):Observable<Credit>{
  return this.http.get(server_api.api+"Movie/"+movie_Id+"/Credit")
  .pipe(map(response=><Credit>response));
 }
 GetDBMovieKeyWords(movie_Id):Observable<KeyWord[]>{
   return this.http.get(server_api.api+"Movie/"+movie_Id+"/KeyWords")
   .pipe(map(response=><KeyWord[]>response));
 }
 GetDBAllMovies():Observable<Movie[]>{
  return this.http.get(server_api.api+"Movie/AllMovies")
  .pipe(map(response=><Movie[]>response));
}

AddDBMovieDetail(fullMovie:FullMovie):Observable<FullMovie>{
  let token = localStorage.getItem("jwt");
  return this.http.post<FullMovie>(server_api.api+"Movie/CreateNewMovie",
  fullMovie,
  {
    headers: new HttpHeaders({
    //  "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    })
  })
  .pipe(map(response=><FullMovie>response));

}
}