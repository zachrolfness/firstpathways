import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';

import { Team } from '../auth-service/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	isActive: boolean = true;

	edit: boolean = false;

	team: Team = {
		name: '',
		branch: '',
		school: ''
	};

	constructor(public auth: AuthService) {
		setTimeout(() => {
			console.log(auth.user.name);
		}, 2000);
	}

	setActive(isActive: boolean) {
		this.isActive = isActive;
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	addTeam() {
		if(!this.auth.user.pathwayTeams) {
			this.auth.user.pathwayTeams = [];
		}
		this.auth.user.pathwayTeams.push(this.team);
		this.team = {
			name: '',
			branch: '',
			school: ''
		};
	}

	saveUser() {
		//
	}

}
