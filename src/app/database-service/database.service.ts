import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase) { }

	public getTeams(): FirebaseListObservable<any[]> {
		return this.db.list('/PathwayTeams/');
	}

	public getTags(): FirebaseObjectObservable<any> {
		return this.db.object('/Tags/');
	}

	public getResources(): FirebaseListObservable<any[]> {
		return this.db.list('/Resources/');
	}

	public getUser(uid: string): FirebaseObjectObservable<any> {
		return this.db.object('/Users/' + uid);
	}

	public getUserTeams(uid: string): FirebaseListObservable<any[]> {
		return this.db.list('/Users/' + uid + '/PathwayTeams');
	}

	public getResourcesByUser(uid: string): FirebaseListObservable<any[]> {
		return this.db.list('/Resources', {
			query: {
				orderByChild: 'User',
				equalTo: uid
			}
		});
	}

	public getUserName(uid: string): Promise<string> {
		return new Promise((resolve, reject) => {
			this.db.object('/Users/' + uid + '/Name').subscribe((snapshot) => {
				resolve(snapshot.$value);
			});
		})
	}

	public getTagsObject() {
		return new Promise((resolve, reject) => {
			this.getTags().subscribe(resolve);
		});
	}

	public searchResources(start, end): FirebaseListObservable<any[]> {
		return this.db.list('/Resources/', {
			query: {
				orderByChild: 'Name',
				limitTo: 10,
				startAt: start,
				endAt: end
			}
		});
	}

	public searchTag(equalTo): FirebaseListObservable<any[]> {
		return this.db.list('/Resources', {
			query: {
				orderByChild: 'Tags/0',
				equalTo: equalTo
			}
		});
	}

}
