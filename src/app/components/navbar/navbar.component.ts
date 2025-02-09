import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn = false;

  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._dataService.user$.subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
      },
    });
  }

  logout() {
    this._authService.logout();
    this.isLoggedIn = false;

    this._router.navigate(['/']);
  }
}
