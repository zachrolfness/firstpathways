import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

export interface User {
	name: string;
	email: string;
	photoUrl?: string;
	bio?: string;
	website?: string;
	pathwayTeams?: Team[]
}

export interface Team {
	name: string;
	branch: string;
	school: string;
}

@Injectable()
export class AuthService {

	public user: User;

	public isLoggedIn: boolean;


	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {

		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;

				this.user = {
					name: auth.displayName,
					email: auth.email,
					photoUrl: auth.photoURL
				};
			} else {
				this.isLoggedIn = false;
				this.user = null;
			}
			// console.log(this.isLoggedIn);
			// console.log(this.user);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				// console.log('Logged in as ' + user.email);
			});
	}

	public signUp(username: string, email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				console.log(user);
				console.log(user.uid);
				this.db.list('Users').update(user.uid + '', {
					email: email,
					photoUrl: '',
					bio: '',
					website: '',
					pathwayTeams: null
				});
			});
	}

	public logout() {
		this.afAuth.auth.signOut();
	}
}
