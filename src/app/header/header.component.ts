import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sidenav: SidenavService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
