import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { DatabaseService } from '../database-service/database.service';

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
	placeholder;

	stringified;
	secondtag;

	resources;
	startAt = new Subject();
	endAt = new Subject();

	query;

	tags = ['FRC', 'FTC', 'FLL', 'FLL Jr.', 'General'];

	constructor(public db: AngularFireDatabase, private dbs: DatabaseService) {
		this.tagUpdate(0);
	}

	ngOnInit() {
		this.dbs.searchResources(this.startAt, this.endAt)
			.subscribe((resources) => this.resources = resources);
	}

	tagUpdate($event) {
		this.db.object('/Tags/').subscribe(snapshot => {
			if(this.items.length == 0) {
				this.tags = ['FRC', 'FTC', 'FLL', 'FLLjr', 'General'];
				this.stringified = JSON.stringify(snapshot);
			}
			else if(this.items.length == 1) {
				this.stringified = JSON.stringify(snapshot[this.items[0].value]);
				this.tags = [];
				for(var i = 3; i < this.stringified.length - 3; i++) {
					if(this.stringified[i] == '"' && this.stringified[i+1] == ':') {
						var loop = true;
						var j = i;
						while(loop) {
							j--;
							if(this.stringified[j] == '"') {
								loop = false;
							}
						}
						this.tags.push(this.stringified.substring(j+1,i));
					}
				}
			}
			else if(this.items.length == 2) {
				this.placeholder = snapshot[this.items[0].value];
				this.tags = this.placeholder[this.items[1].value];
			}
		});
	}

	// Zach: Here is a better version of what you were trying to accomplish above.
	tagUpdate2(event): void {
		this.dbs.getTagsObject().then((snapshot) => {
			if(this.items.length == 0) {
				this.tags = ['FRC', 'FTC', 'FLL', 'FLLjr', 'General'];
			} else if(this.items.length == 1) {
				this.tags = Object.keys(snapshot[this.items[0].value]);
			} else if(this.items.length == 2) {
				this.tags = (<any>Object).values(snapshot[this.items[0].value][this.items[1].value]);
			}
		});
	}

	searchTitle() {
		this.startAt.next(this.query);
		this.endAt.next(this.query + '\uf8ff');
	}

	searchTags() {
		//
	}

}
