import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flixapp.herokuapp.com';
export interface User {
  _id: string;
  FavoriteMovies: Array<string>;
  Username: string;
  Email: string;
  Birthday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call for the user Login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Making the api call to get All Movies endpoint
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to get Movie by title endpoint
  getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + Title, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to get Director endpoint
  getDirector(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/directors/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to get Genre endpoint
  getGenre(Name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/genres/' + Name, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the user endpoint
  getUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to get FavoriteMovies endpoint
  getFavoriteMovies(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + Username + '/movies', {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call to add FavoriteMovie endpoint
  addFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
      .put(apiUrl + '/users/' + Username + '/movies/' + MovieID, null, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the edit User endpoint
  editUser(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + '/users/' + Username, userDetails, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the delete User endpoint
  deleteUser(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + Username, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for the delete FavoriteMovie endpoint
  deleteFavoriteMovie(MovieID: any): Observable<any> {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + Username + '/movies/' + MovieID, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  // handle error
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}