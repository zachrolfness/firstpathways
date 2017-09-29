import { Component } from '@angular/core';

import { AuthService } from './auth-service/auth.service';
import {} from '@types/googlemaps';
declare var google: any;



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

	constructor(public auth: AuthService) {
	}
}
