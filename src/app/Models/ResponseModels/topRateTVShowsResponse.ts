import { TVShow } from "../tvShow";

export interface TopRateTVShowsResponse{
    page:number;
    total_results:number;
    total_pages:number;
    results:TVShow[];
}