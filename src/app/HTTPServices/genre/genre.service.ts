import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from 'src/app/Models/genre';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tmdb } from 'src/app/APIConfig'

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http:HttpClient) { }
  
  GetMoviesGenres():Observable<Genre[]>{
 return this.http.get<{genres:Genre[]}>(tmdb.api+"3/genre/movie/list?api_key="+tmdb.api_key)
 .pipe(map(response=><Genre[]>response.genres));
  }

  GetTVShowsGenres():Observable<Genre[]>{
    return this.http.get<{genres:Genre[]}>(tmdb.api+"3/genre/tv/list?api_key="+tmdb.api_key)
    .pipe(map(response=><Genre[]>response.genres))
  }
}
