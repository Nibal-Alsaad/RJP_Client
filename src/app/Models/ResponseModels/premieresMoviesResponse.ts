import { Movie } from "../movie";

export interface PremieresMoviesResponse{
    results:Movie[];
    page:number;
    total_results:number;
    dates:any;
    total_pages:number;
}