import { Component, OnInit } from '@angular/core';
import { AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  providers = AuthProvider;
  themes = Theme; // to set the theme of buttons in the template, for example: [theme]="themes.CLASSIC"

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openApp(event: Event) {
    this.router.navigate(['/damaging-events']);
  }

  printError(event: Event) {
    console.error(event);
  }


}
