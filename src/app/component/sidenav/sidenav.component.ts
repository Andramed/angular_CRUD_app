import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DecodedTokenInerface } from 'src/app/interface/DecodedToken';
import { UserSelector } from 'src/app/services/storeNgxs/selectors/authenticatedUser.selector';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{
	@ViewChild('sidNav') sidNav!: MatDrawer;
	isDrawerOpen: boolean = false;
	userRole!: number;
	@Select(UserSelector.userLoged) userLoged$!: Observable<DecodedTokenInerface>
	constructor() {
		
	}

	ngOnInit(): void {
		this.userLoged$.subscribe({
			next: (value) => {
				console.log({
					location: "sinav componnet on init",
					value
				});
				
			}
		})
	}
  toggleDrawer() {
    this.sidNav.toggle();
	console.log(this.isDrawerOpen);
	
    this.isDrawerOpen = !this.isDrawerOpen;
	console.log(this.isDrawerOpen);
	
  }
	
}
