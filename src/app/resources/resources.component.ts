import { Component, OnInit } from '@angular/core';

import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';
import { StorageService } from '../storage-service/storage.service';
import { TagsService } from '../tags-service/tags.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
		tags: []
	};

	Resources: FirebaseListObservable<any[]>;

	uid: string;

	file: File;

	view: boolean = true;
	edit: boolean = false;
	add: boolean = false;

	items = [];
	tags = ['FRC', 'FTC', 'FLL', 'FLL Jr', 'General'];

	constructor(public auth: AuthService, private db: DatabaseService, private storage: StorageService, private ts: TagsService,
	private flash: FlashMessagesService) {}

	ngOnInit() {
		this.auth.getUID().then((uid: string) => {
			this.Resources = this.db.getResourcesByUser(uid);
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
			case 'FRC': return 'FRC';
			case 'FTC': return 'FTC';
			case 'FLL': return 'FLL';
			case 'FLLJr': return 'FLLJr';
			default: return 'badge-primary';
		}
	}

	isBranch(branch: string): boolean {
		return branch == this.resource.branch;
	}

	selectBranch(branch: string) {
		this.resource.branch = branch;
	}

	tagUpdate(event): void {
		this.ts.tagsUpdate(this.items).then((tags) => this.tags = tags);
	}

	addTag() {
		this.resource.tags.push(this.tags[0]);
		this.items = [];
		this.tags = [];
	}

	uploadFile(file: File) {
		this.file = file;
	}

	addResource() {
		 this.storage.uploadResource(this.auth.uid, this.file)
			.then((downloadURL: string) => {

				this.Resources.push({
					Name: this.resource.name,
					Branch: this.resource.branch,
					Description: this.resource.description,
					User: this.uid,
					URL: downloadURL,
					Tags: this.resource.tags
				});

				this.resource = {
					name: '',
					branch: '',
					description: '',
					url: '',
					tags: []
				};

				this.file = null;
				this.showView();
			});
	}

	saveResource(key: string, name: string, branch: string, description: string) {
		this.Resources.update(key, {
			Name: name,
			Branch: branch,
			Description: description
		});

		this.showView();

	}

	removeResource(key: string) {
		if(key) {
			this.Resources.remove(key);
		} else {
			console.log('Resource key does not exist.');
		}
	}

}
