import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { User } from '../data-models/user';

@Injectable()
export class AuthService {

	public user: User;

	public uid: string;

	public isLoggedIn: boolean;

	constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
		this.isLoggedIn = false;

		this.afAuth.authState.subscribe((auth) => {
			if(auth) {
				this.isLoggedIn = true;
				this.uid = auth.uid;
			} else {
				this.isLoggedIn = false;
				this.uid = null;
			}
			console.log('Logged in: ', this.isLoggedIn);
		});
	}

	public getUID(): Promise<string> {
		return new Promise((resolve, reject) => {
			this.afAuth.authState.subscribe((auth) => auth? resolve(auth.uid): resolve(null));
		});
	}

	public login(email: string, password: string) {
		this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	public signUp(username: string, email: string, password: string) {
		this.afAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				this.db.list('Users').update(user.uid + '', {
					Name: username,
					Email: email,
					PhotoURL: '',
					Bio: '',
					Website: '',
					PathwayTeams: null
				});
			});
	}

	public logout() {
		this.afAuth.auth.signOut();
	}

	public isAdmin(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.getUID().then((uid) => {
				this.db.object('/Users/' + uid).subscribe((User) => resolve(User.Admin));
			});
		});
	}
}
