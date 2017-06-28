import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

	login(email: string, password: string) {
		this.auth.login(email, password);
		email = '';
		password = '';
	}

	loginGoogle() {
		this.auth.loginGoogle();
	}

	signUp(email: string, password: string) {
		this.auth.signUp(email, password);
		email = '';
		password = '';
	}

	logout() {
		this.auth.logout();
	}

	ngOnInit() {
	}

}
