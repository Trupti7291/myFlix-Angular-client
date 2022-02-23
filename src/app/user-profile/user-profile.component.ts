import { Component, OnInit } from '@angular/core';
import { UserRegistrationService, User } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  FavMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
  }

  // Call API end-point to get the user's information
  getUserInfo(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: User) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

  // Get user's FavoriteMovies from the user's data
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovies = resp.FavoriteMovies;
      console.log(this.FavMovies);
      return this.FavMovies;
    });
  }

  // API end-point to remove user favorite
  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
  }

  // API end-point to remove the current user
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.Username).subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  // Edit the user profile
  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, {
      width: '280px',
    });
  }

  // Open a dialog to display the GenreCardComponent
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  // Open a dialog to display the DirectorCardComponent
  openDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio, birth: birth, death: death },
      width: '300px',
    });
  }

  //  Open a dialog to display the SynopsisCardComponent
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
}

