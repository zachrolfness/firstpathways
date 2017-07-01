import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';

import { Team } from '../data-models/user';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

	isActive: boolean = true;

	edit: boolean = true;

	team: Team = {
		name: '',
		number: 0,
		branch: '',
		school: ''
	};

	User: FirebaseObjectObservable<any>;

	PathwayTeams: FirebaseListObservable<any[]>;

	user: {
		photoURL: string;
		bio: string;
		website: string;
	};

	constructor(public auth: AuthService, private db: DatabaseService) {
		this.User = db.getUser(auth.uid);
		this.PathwayTeams = db.getPathwayTeams(this.auth.uid);
	}

	setActive(isActive: boolean) {
		this.isActive = isActive;
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	addTeam() {

		this.PathwayTeams.push({
			Name: this.team.name,
			Number: this.team.number,
			Branch: this.team.branch,
			School: this.team.school
		});

		this.team = {
			name: '',
			number: 0,
			branch: '',
			school: ''
		};
	}

	saveUserBio(bio: string) {
		this.User.update({
			Bio: bio
		});
	}

	saveUserWebsite(website: string) {
		this.User.update({
			Website: website
		});
	}
	saveTeam(key: string, name: string, number: number, branch: string, school: string) {
		this.PathwayTeams.update(key, {
			Name: name,
			Number: number,
			Branch: branch,
			School: school
		});
	}

	removeTeam(key: string) {
		if(key) {
			this.PathwayTeams.remove(key);
		} else {
			console.log('Team key does not exist.');
		}
	}

}
