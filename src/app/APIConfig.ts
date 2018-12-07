
export interface configModel{
    api:string;
    api_key:string;
}
export const tmdb:configModel={
         api:"https://api.themoviedb.org/",
         api_key:"ddf9442c69a1aa97524b66e3cba8b9b0"
     };
export const server_api:configModel={
       api:"http://localhost:60578/api/",
       api_key:""
     };
 