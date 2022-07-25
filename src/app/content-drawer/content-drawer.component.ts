import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../shared/sidenav.service';
import { UserSelectionsService } from '../shared/user-selections.service';

@Component({
  selector: 'app-content-drawer',
  templateUrl: './content-drawer.component.html',
  styleUrls: ['./content-drawer.component.scss']
})
export class ContentDrawerComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav | undefined;

  constructor(private sideNavService: SidenavService, public userSelections: UserSelectionsService) { }

  ngOnInit() {
    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      if (this.sidenav) {
        this.sidenav.toggle();
      }
    });
  }

  closeSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

}
