import { Injectable, ViewChild } from '@angular/core';
import {GuardService} from './guard.service'
import { JWTServiceService } from './jwtservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	isAuthorized!: boolean;


  constructor(
	private guardService: GuardService,
	private jwtService: JWTServiceService,
  ) { 
  }

  authorize(useCase:string) {
	switch (useCase) {
		case "tokenPresent":
			this.guardService.validateToken().subscribe({
				next: (value) => {
					if (value) {
						this.isAuthorized = true;
						this.jwtService.decodeToken(this.isAuthorized, "ng on init app components").subscribe();
					}
				},
			});
			break;

		case "signIn":
				this.isAuthorized = true;
				this.jwtService.decodeToken(this.isAuthorized, "ng on init app components").subscribe();
			break;
			
		default:
			break;
	}		
  }

  
}
