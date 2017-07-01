import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { Team } from '../data-models/user';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase) { }

	public getUser(uid: string): FirebaseObjectObservable<any> {
		return this.db.object('/Users/' + uid);
	}

	public getPathwayTeams(uid: string): FirebaseListObservable<any[]> {
		return this.db.list('/Users/' + uid + '/PathwayTeams');
	}

	public uploadImage(uid: string, file: File, username: string): void {
		firebase.storage().ref('/Users/' + uid + '/' + username + ' Profile Picture')
			.put(file).then(snapshot => {
				this.getUser(uid).update({
					PhotoURL: snapshot.downloadURL
				});
			});
	}

}
