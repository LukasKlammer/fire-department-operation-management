import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { SidenavService } from '../shared/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private sidenav: SidenavService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
