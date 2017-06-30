import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import { Team } from '../data-models/user';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase) { }

	public getUser(uid: string): FirebaseObjectObservable<any> {
		return this.db.object('/Users/' + uid);
	}

}
