import { TVShow } from "./tvShow";
import { Genre } from "./genre";
import { KeyWord } from "./keyWord";
import { Cast } from "./cast";
import { Crew } from "./crew";

export class FullTVShow{
    tvShow:TVShow;
    genres_collection:Genre[];
    keyWords_collection:KeyWord[];
    casts_collection:Cast[];
    crews_collection:Crew[]  ; 
}