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
			console.log(this.isLoggedIn);
			console.log(this.user);
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.log('Logged in as ' + user.email);
			});
	}

	public loginGoogle() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			// .then((auth) => {
			// 	let user = this.db.object(`Users/${auth.email}`);
			// 	user.subscribe(data => {
			// 		if(data.$value !== null) {
			// 			console.log('User does not exist');
			// 			this.db.list('Users').update()
			// 		} else {
			// 			console.log('User does exist');
			// 		}
			// 	});
			// });
	}

	public signUp(email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password);
	}

	public logout() {
		this.afAuth.auth.signOut();
	}
}
