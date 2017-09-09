import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';
import { StorageService } from '../storage-service/storage.service';

import { Resource } from '../data-models/resource';

@Component({
	selector: 'app-resources',
	templateUrl: './resources.component.html',
	styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

	resource: Resource = {
		name: '',
		branch: '',
		description: '',
		url: '',
		// tags: []
	};

	UserResources: FirebaseListObservable<any[]>;
	Resources: FirebaseListObservable<any[]>;

	uid: string;

	file: File;

	view: boolean = true;
	edit: boolean = false;
	add: boolean = false;

	constructor(
		public auth: AuthService,
		private db: DatabaseService,
		private storage: StorageService
	) {}

	ngOnInit() {
		this.Resources = this.db.getResources();
		this.auth.getUID().then((uid: string) => {
			this.UserResources = this.db.getUserResources(uid);
			this.uid = uid;
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

	getBadgeColor(branch: string): string {
		switch(branch) {
			case 'FRC': return 'badge-primary';
			case 'FTC': return 'badge-warning';
			case 'FLL': return 'badge-danger';
			case 'FLL Jr': return 'badge-success';
			default: break;
		}
	}

	isBranch(branch: string): boolean {
		return branch == this.resource.branch;
	}

	selectBranch(branch: string) {
		this.resource.branch = branch;
	}

	uploadFile(file: File) {
		this.file = file;
		console.log(file);
	}

	addResource() {
		this.storage.uploadResource(this.auth.uid, this.file)
			.then((downloadURL: string) => {

				let pushKey: string;

				this.Resources.push({
					Name: this.resource.name,
					Branch: this.resource.branch,
					Description: this.resource.description,
					User: this.uid,
					URL: downloadURL,
					// Tags: this.resource.tags
				}).then((key) => pushKey = key);

				this.UserResources.update(pushKey, true);

				this.resource = {
					name: '',
					branch: '',
					description: '',
					url: '',
					// tags: []
				};

				this.file = null;

			});
	}

	saveResource(key: string, name: string, branch: string, description: string) {
		this.UserResources.update(key, {
			Name: name,
			Branch: branch,
			Description: description
		});

	}

	removeResource(key: string) {
		if(key) {
			this.UserResources.remove(key);
		} else {
			console.log('Resource key does not exist.');
		}
	}

}
