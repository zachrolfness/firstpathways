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
export class ProfileComponent implements OnInit {

	edit: boolean = false;

	User: FirebaseObjectObservable<any>;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		setTimeout(() => {
			this.User = this.db.getUser(this.auth.uid);
		}, 1000);
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	uploadImage(file: File) {
		this.User.subscribe(User => {
			this.db.uploadImage(this.auth.uid, file, User.Name);
		});
	}

	saveUserWebsite(website: string) {
		this.User.update({
			Website: website
		});
	}

	saveUserBio(bio: string) {
		this.User.update({
			Bio: bio
		});
	}

}
