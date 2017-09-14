import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { DatabaseService } from '../database-service/database.service';
import { TagsService } from '../tags-service/tags.service';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-travel-book',
	templateUrl: './travel-book.component.html',
	styleUrls: ['./travel-book.component.css']
})
export class TravelBookComponent implements OnInit {

	tagObject: FirebaseObjectObservable<any>;

	items = [];

	resources;
	startAt = new Subject();
	endAt = new Subject();

	query;

	tags = ['FRC', 'FTC', 'FLL', 'FLL Jr', 'General'];

	equalTo = new Subject();

	constructor(private db: DatabaseService, private ts: TagsService) {}

	ngOnInit() {
		this.tagUpdate(0);

		setTimeout(() => this.searchTitle(), 1000);

		this.db.searchResources(this.startAt, this.endAt)
			.subscribe((resources) => this.resources = resources);

		this.db.searchTag(this.equalTo)
			.subscribe((resources) => this.resources = resources);

	}

	tagUpdate(event): void {
		this.ts.tagsUpdate(this.items).then((tags) => this.tags = tags);
	}

	searchTitle() {
		this.startAt.next(this.query);
		this.endAt.next(this.query + '\uf8ff');
	}

	searchTags() {
		this.equalTo.next(this.tags[0]);
	}

}
