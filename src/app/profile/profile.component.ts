import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';
import { StorageService } from '../storage-service/storage.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Team } from '../data-models/team';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	edit: boolean = false;

	User: FirebaseObjectObservable<any>;

	constructor(
		public auth: AuthService,
		private db: DatabaseService,
		private storage: StorageService,
		private _flashMessagesService: FlashMessagesService
	) {}

	ngOnInit() {

		this.auth.getUID().then((uid: string) => {
			this.User = this.db.getUser(uid);
		});
	}

	toggleEdit() {
		this.edit = !this.edit;
	}

	uploadImage(file: File, name: string) {
		console.log(name);
		this.storage.uploadImage(this.auth.uid, file, name)
			.then((url: string) => {
				this.User.update({
					PhotoURL: url
				})
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
