import { Genre } from "../genre";

export interface TVShowGenresReponse{
     backdrop_path : string ;
     created_by : any[] ;
     episode_run_time :any[] ;
     first_air_date : string ;
     genres :Genre [] ;
     homepage : string ;
     id : number ;
     in_production : boolean ;
     languages :any[] ;
     last_air_date :string ;
     last_episode_to_air : any ;
     name : string ;
     next_episode_to_air : string ;
     networks : any[] ;
     number_of_episodes : number ;
     number_of_seasons : number ;
     origin_country :any[] ;
     original_language : string ;
     original_name : string ;
     overview : string ;
     popularity : number ;
     poster_path :string ;
     production_companies : any[] ;
     seasons : any[] ;
     status : string ;
     type : string ;
     vote_average : number ;
     vote_count : number
}