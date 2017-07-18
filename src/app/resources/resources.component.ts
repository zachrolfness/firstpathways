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
		tags: ''
	};

	Resources: FirebaseListObservable<any[]>;

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
		this.auth.getUID().then((uid: string) => {
			this.Resources = this.db.getUserResources(uid);
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

				this.Resources.push({
					Name: this.resource.name,
					Branch: this.resource.branch,
					Description: this.resource.description,
					URL: downloadURL,
					Tags: this.resource.tags
				});

				this.db.getResources(this.resource.branch).push({
					Name: this.resource.name,
					Description: this.resource.description,
					URL: downloadURL,
					Tags: this.resource.tags
				});

				this.resource = {
					name: '',
					branch: '',
					description: '',
					url: '',
					tags: ''
				};

				this.file = null;

			});
	}

	saveResource(key: string, name: string, branch: string, description: string) {
		this.Resources.update(key, {
			Name: name,
			Branch: branch,
			Description: description
		});

	}

	removeResource(key: string) {
		if(key) {
			this.Resources.remove(key);
		} else {
			console.log('Resource key does not exist.');
		}
	}

}
