import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {

  providers = AuthProvider;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

  printUser(event: Event) {
    console.log(event);
  }

  printError(event: Event) {
    console.error(event);
  }


}
