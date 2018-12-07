import { Movie } from "../movie";

export interface TopRateMoviesResponse{
    page:number;
    total_results:number;
    total_pages:number;
    results:Movie[];
}