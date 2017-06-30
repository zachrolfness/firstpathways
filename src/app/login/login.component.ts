import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

	login(email: string, password: string) {
		this.auth.login(email, password);

		email = '';
		password = '';

		this.goToProfile();
	}

	goToProfile() {
		this.router.navigate(['./profile']);
	}

	ngOnInit() {
	}

}
