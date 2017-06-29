import { Component, OnInit } from '@angular/core';


import { AuthService } from '../auth-service/auth.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  roles;

  constructor(public auth: AuthService, private router: Router) {
    this.roles = ['FRC Team', 'FTC Team', 'Adult Mentor'];
  }


	signUp(email: string, password: string, username: string, role: string) {
		this.auth.signUp(email, password);
    this.auth.login(email, password);

    console.log(role);

    //implement code to add both the username and role to the user data

		email = '';
		password = '';

    this.router.navigate(['./profile'])
	}

	ngOnInit() {
	}

}
