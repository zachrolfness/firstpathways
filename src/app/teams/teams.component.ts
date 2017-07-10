import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';

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

	PathwayTeams: FirebaseListObservable<any[]>;

	view: boolean = true;
	edit: boolean = false;
	add: boolean = false;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.auth.getUID().then((uid: string) => {
			this.PathwayTeams = this.db.getUserTeams(uid);
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
			return 'badge-primary';
		} else if(branch == 'FTC') {
			return 'badge-warning';
		} else if(branch == 'FLL') {
			return 'badge-danger';
		} else if(branch == 'FLL Jr') {
			return 'badge-success';
		}
	}

	isBranch(branch: string): boolean {
		return branch == this.team.branch;
	}

	addTeam() {
		this.PathwayTeams.push({
			Name: this.team.name,
			Number: this.team.number,
			Branch: this.team.branch,
			School: this.team.school
		});

		this.db.getTeams(this.team.branch)
			.update('' + this.team.number, {
				Name: this.team.name,
				School: this.team.school
			});

		this.team = {
			name: '',
			number: 0,
			branch: '',
			school: ''
		};
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
