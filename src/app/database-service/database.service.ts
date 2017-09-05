import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase) { }

	public getTeams(branch: string): FirebaseListObservable<any[]> {
		return this.db.list('/PathwayTeams/' + branch);
	}

	public getTags(): FirebaseObjectObservable<any> {
		return this.db.object('/Tags/');
	}

	public getResources(branch: string): FirebaseListObservable<any[]> {
		return this.db.list('/Resources/' + branch);
	}

	public getUser(uid: string): FirebaseObjectObservable<any> {
		return this.db.object('/Users/' + uid);
	}

	public getUserTeams(uid: string): FirebaseListObservable<any[]> {
		return this.db.list('/Users/' + uid + '/PathwayTeams');
	}

	public getUserResources(uid: string): FirebaseListObservable<any[]> {
		return this.db.list('/Users/' + uid + '/Resources');
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
		return this.db.list('/Resources/FRC', {
			query: {
				orderByChild: 'Name',
				limitTo: 10,
				startAt: start,
				endAt: end
			}
		});
	}

}
