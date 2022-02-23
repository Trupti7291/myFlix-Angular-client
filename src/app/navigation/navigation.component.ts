import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You successfully logged out!', 'Ok', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
  }

}
