import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';
import { BlueAllianceService } from '../blue-alliance-service/blue-alliance.service';

import { Team } from '../data-models/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

	team: Team = {
		name: '',
		number: 0,
		branch: '',
		school: ''
	};

	UserTeams: FirebaseListObservable<any[]>;
	PathwayTeams: FirebaseListObservable<any[]>;

	view: boolean = true;
	edit: boolean = false;
	add: boolean = false;

	constructor(public auth: AuthService, private db: DatabaseService, private blueApi: BlueAllianceService) {
	}

	ngOnInit() {
		this.blueApi.getTeam(1165).then(console.log);

		// this.PathwayTeams = this.db.getTeams();
		this.auth.getUID().then((uid: string) => {
			this.UserTeams = this.db.getUserTeams(uid);
		});
	}

	showView() {
		this.view = true;
		this.edit = false;
		this.add = false;
	}

	showEdit() {
		this.view = false;
		this.edit = true;
		this.add = false;
	}

	showAdd() {
		this.view = false;
		this.edit = false;
		this.add = true;
	}

	selectBranch(branch: string) {
		this.team.branch = branch;
	}

	getBadgeColor(branch: string): string {
		if(branch == 'FRC') {
			return '#009cd7';
		} else if(branch == 'FTC') {
			return '#f57e25';
		} else if(branch == 'FLL') {
			return '#ed1c24';
		} else if(branch == 'FLL Jr') {
			return '#00a651';
		}
	}

	isBranch(branch: string): boolean {
		return branch == this.team.branch;
	}

	getTeamNumber(Team): string {
		return Team.$key.split(':').pop();
	}

	addTeam() {
		this.UserTeams.update(this.team.branch + ':' + this.team.number, true);

		this.db.getTeams().update(this.team.branch + ':' + this.team.number, {
			Name: this.team.name,
			School: this.team.school
		});

		this.team = {
			name: '',
			number: 0,
			branch: '',
			school: ''
		};

		this.showView();
	}

	saveTeam(key: string, name: string, number: number, branch: string, school: string) {
		this.UserTeams.update(key, {
			Name: name,
			Number: number,
			Branch: branch,
			School: school
		});
	}

	removeTeam(key: string) {
		if(key) {
			this.UserTeams.remove(key);
		} else {
			console.log('Team key does not exist.');
		}
	}

}
