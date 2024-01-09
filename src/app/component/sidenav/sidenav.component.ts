import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
	@ViewChild('sidNav') sidNav!: MatDrawer;
  isDrawerOpen: boolean = false;

  toggleDrawer() {
    this.sidNav.toggle();
	console.log(this.isDrawerOpen);
	
    this.isDrawerOpen = !this.isDrawerOpen;
	console.log(this.isDrawerOpen);
	
  }
	
}
