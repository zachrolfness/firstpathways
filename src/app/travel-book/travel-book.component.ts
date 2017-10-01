import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { DatabaseService } from '../database-service/database.service';
import { TagsService } from '../tags-service/tags.service';

import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as _ from "lodash";

@Component({
	selector: 'app-travel-book',
	templateUrl: './travel-book.component.html',
	styleUrls: ['./travel-book.component.css']
})
export class TravelBookComponent implements OnInit {

	tagObject: FirebaseObjectObservable<any>;

	items = [];

	resources: any;
	offset = 5;
	nextKey: any;
	prevKeys: any[] = [];
	subscription: any;

	search = new Subject();

	query;

	tags = [];

	equalTo = new Subject();
	key = new Subject();

	constructor(private db: DatabaseService, private ts: TagsService) {}

	ngOnInit() {
		this.tagUpdate(0);
		this.getResources();

		this.db.searchResources(this.offset, this.key)
			.subscribe((resources) => {
				this.resources = _.slice(resources, 0, this.offset);
				this.nextKey = _.get(resources[this.offset], '$key');
		});

		this.db.searchName(this.search)
			.subscribe((resources) => {
			this.resources = resources;
			this.resources = _.slice(resources, 0, this.offset);
			this.nextKey = _.get(resources[this.offset], '$key');
		});

		this.db.searchTag(this.equalTo)
			.subscribe((resources) => {
			this.resources = resources;
			this.resources = _.slice(resources, 0, this.offset);
			this.nextKey = _.get(resources[this.offset], '$key');
		});
	}

	nextPage(){
		this.prevKeys.push(_.first(this.resources)['$key'])
		this.key.next(this.nextKey);
	}

	prevPage(){
		const prevKey = _.last(this.prevKeys)
		this.prevKeys = _.dropRight(this.prevKeys)

		this.key.next(prevKey);
	}

	tagUpdate(event): void {
		this.ts.tagsUpdate(this.items).then((tags) => this.tags = tags);
	}

	searchTitle() {
		if(this.query){
			this.search.next(this.query);
		}else{
			this.getResources();
		}
	}

	searchTags() {
		if(this.items[2]){
			this.equalTo.next(this.tags[0]);
		}else{
			this.getResources();
		}
	}

	getResources(key?){
		this.db.searchResources(this.offset, key)
			.subscribe((resources) => {
				this.resources = _.slice(resources, 0, this.offset);
				this.nextKey = _.get(resources[this.offset], '$key');
		});
	}



	rExist(){
		return this.resources.length > 0;
	}

}
