import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';

import { AngularFireDatabase } from 'angularfire2/database';

import { Team } from '../data-models/user';

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

	User: FirebaseObjectObservable<any>;

	constructor(public auth: AuthService, private db: DatabaseService, private afDb: AngularFireDatabase) {
		this.User = afDb.object('/Users/' + auth.uid);
	}

	setActive(isActive: boolean) {
		this.isActive = isActive;
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	addTeam() {

		this.User.update({
			PathwayTeams: [{
				Name: this.team.name,
				Branch: this.team.branch,
				School: this.team.school
			}]
		});

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
