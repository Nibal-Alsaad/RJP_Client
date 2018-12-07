import { AccountService } from './HTTPServices/account/account.service';
import { TvShowDetailsComponent } from './Components/tv-show-details/tv-show-details.component';
import { RouterModule } from '@angular/router';
import { MovieService } from './HTTPServices/movie/movie.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './Components/movie/movie.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { MaterialCardComponent } from './Components/material-card/material-card.component'
import { GenreService } from './HTTPServices/genre/genre.service';
import { TvShowComponent } from './Components/tv-show/tv-show.component';
import { TvShowService } from './HTTPServices/tv_show/tv-show.service';
import { HomeComponent } from './Components/home/home.component';
import { PremiereComponent } from './Components/premiere/premiere.component';
import { TopMoviesComponent } from './Components/top-movies/top-movies.component';
import { TopTvShowsComponent } from './Components/top-tv-shows/top-tv-shows.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/auth-guard/auth-guard.service';
import { CastComponent } from './Components/cast/cast.component';
import { CrewComponent } from './Components/crew/crew.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MaterialCardComponent,
    TvShowComponent,
    HomeComponent,
    PremiereComponent,
    TopMoviesComponent,
    TopTvShowsComponent,
    MovieDetailsComponent,
    TvShowDetailsComponent,
    LoginComponent,
    CastComponent,
    CrewComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'',component:HomeComponent},
      {path:'topMovies',component:TopMoviesComponent,canActivate:[AuthGuard]},
      {path:'topShows',component:TopTvShowsComponent,canActivate:[AuthGuard]},
      {path:'premieres',component:PremiereComponent,canActivate:[AuthGuard]},
      {path:'movies',component:MovieComponent,canActivate:[AuthGuard]},
      {path:'tvShows',component:TvShowComponent,canActivate:[AuthGuard]},
      {path:'movie-details/:id',component:MovieDetailsComponent,canActivate:[AuthGuard]},
      {path:'tvShow-details/:id',component:TvShowDetailsComponent,canActivate:[AuthGuard]},
      {path:'details-casts/:materialType/:id',component:CastComponent},
      {path:'details-crews/:materialType/:id',component:CrewComponent},
      {path:'login',component:LoginComponent}
    ])
  ],
  providers: [
    MovieService,
    GenreService,
    TvShowService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
