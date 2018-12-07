import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TVShow } from 'src/app/Models/tvShow';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Genre } from 'src/app/Models/genre';
import { Credit } from 'src/app/Models/credit';
import { KeyWord } from 'src/app/Models/keyWord';
import { TopRateTVShowsResponse } from 'src/app/Models/ResponseModels/topRateTVShowsResponse';
import { TVShowGenresReponse } from 'src/app/Models/ResponseModels/tvShowGenresResponse';
import { TVKeyWordResponse } from 'src/app/Models/ResponseModels/tvKeyWordsResponse';
import { FullTVShow } from 'src/app/Models/fullTVShow';
import { tmdb } from 'src/app/APIConfig'
import { server_api } from 'src/app/APIConfig'

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http:HttpClient) { }
  GetTopRateTVShows():Observable<TVShow[]>{
   return this.http.get<TopRateTVShowsResponse>(tmdb.api+"3/discover/tv?api_key="+tmdb.api_key+"&sort_by=vote_average.desc&page=1")
     .pipe(map(response=><TVShow[]>response.results));
   }
   GetTVShowGenres(show_Id):Observable<Genre[]>{
    return this.http.get<TVShowGenresReponse>(tmdb.api+"3/tv/"+show_Id+"?api_key="+tmdb.api_key)
    .pipe(map(response=><Genre[]>response.genres));
  }
  GetTVShowDetails(tv_id:number):Observable<TVShow>{
    return this.http.get(tmdb.api+"3/tv/"+tv_id+"?api_key="+tmdb.api_key)
    .pipe(map(response=><TVShow>response));
  }
  GetTVShowCredit(tv_id:number):Observable<Credit>{
   return this.http.get(tmdb.api+"3/tv/"+tv_id+"/credits?api_key="+tmdb.api_key)
   .pipe(map(response=><Credit>response));
  }
  GetTVShowKeyWords(tv_id:number):Observable<KeyWord[]>{
    return this.http.get<TVKeyWordResponse>(tmdb.api+"3/tv/"+tv_id+"/keywords?api_key="+tmdb.api_key)
    .pipe(map(response=><KeyWord[]>response.results));
  }
  GetDBTVDetails(tv_id):Observable<TVShow>{
    return this.http.get(server_api.api+"TVShow/"+tv_id)
    .pipe(map(response=><TVShow>response));
  }
  GetDBTVGenres(tv_id):Observable<Genre[]>{
    return this.http.get(server_api.api+"TVShow/"+tv_id+"/Genres")
    .pipe(map(response=><Genre[]>response));
  }
  GetDBTVCredit(tv_id):Observable<Credit>{
    return this.http.get(server_api.api+"TVShow/"+tv_id+"/Credit")
    .pipe(map(response=><Credit>response));
   }
   GetDBTVKeyWords(tv_id):Observable<KeyWord[]>{
     return this.http.get(server_api.api+"TVShow/"+tv_id+"/KeyWords")
     .pipe(map(response=><KeyWord[]>response));
   }
   GetDBAllTVShows():Observable<TVShow[]>{
    return this.http.get(server_api.api+"TVShow/AllMovies")
    .pipe(map(response=><TVShow[]>response));
  }
  
   AddDBTVDetail(fullTVShow:FullTVShow):Observable<FullTVShow>{
     let token = localStorage.getItem("jwt");
     return this.http.post(server_api.api+"TVShow/CreateNewTVShow",
     JSON.stringify(fullTVShow),
     {
       headers: new HttpHeaders({
         "Authorization": "Bearer " + token,
         "Content-Type": "application/json"
       })
     })
     .pipe(map(response=><FullTVShow>response));

   }
}
