import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {
	currentUrl!: string;
	previousUrl!: string

	constructor (private router: Router){
		this.router.events.subscribe(
			(val) => {
				if(val instanceof NavigationEnd) this.currentUrl = this.router.url.substring(1)

			}
		)
	}

	ngOnInit(): void {
		console.log(this.router.url);
		this.previousUrl = this.router.url.substring(1)
	}

}
