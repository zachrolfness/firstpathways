import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';
import { NguiMapModule} from '@ngui/map';
import {} from '@types/googlemaps';




@Component({
	selector: 'app-login',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

	username: string;
	email: string;
	password: string;
	roles: string[];
	loc: string;

	constructor(public auth: AuthService, private router: Router) {
		this.roles = ['FRC Team', 'FTC Team', 'Adult Mentor'];
		this.username = '';
	}



	geocode(address){
    return new Promise(function(resolve,reject){
			var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            resolve(results);
          } else {
            this.lat = 0;
          }
        });
      });
  }

	signUp(username: string, email: string, password: string, role: string) {
		email = '';
		password = '';
		this.geocode(this.loc).then(results => {

			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();

			//include adding the lat and lng to the signup account
			this.auth.signUp(username, email, password);

    });


		this.goToProfile();
	}

	goToProfile() {
		this.router.navigate(['./profile']);
	}

	ngOnInit() {

	}

}
