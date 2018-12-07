import { Crew } from 'src/app/Models/crew';
import { Cast } from './cast';
import { KeyWord } from './keyWord';
import { Genre } from 'src/app/Models/genre';
import { Movie } from "./movie";

export class FullMovie{
    movie:Movie;
    genres_collection:Genre[];
    keyWords_collection:KeyWord[];
    casts_collection:Cast[];
    crews_collection:Crew[]  ; 
}