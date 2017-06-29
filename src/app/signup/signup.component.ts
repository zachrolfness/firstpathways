import { Component, OnInit } from '@angular/core';


import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';

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

	constructor(public auth: AuthService, private router: Router) {
		this.roles = ['FRC Team', 'FTC Team', 'Adult Mentor'];

		this.username = 'Kesav Kadalazhi';
	}


	signUp(username: string, email: string, password: string, role: string) {
		this.auth.signUp(username, email, password);
		// this.auth.login(email, password);

		// console.log(role);

		//implement code to add both the username and role to the user data

		email = '';
		password = '';

		// this.router.navigate(['./profile']);
	}

	ngOnInit() {
	}

}
