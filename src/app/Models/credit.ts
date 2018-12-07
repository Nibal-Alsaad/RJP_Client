import { Cast } from './cast';
import { Crew } from './crew'

export interface Credit{
    id:number;
    cast:Cast[];
    crew:Crew[];
}