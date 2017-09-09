import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { BlueTeam } from '../data-models/team';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlueAllianceService {

	baseUrl: string = 'https://www.thebluealliance.com/api/v3';

	headers: {
		headers: Headers;
	};

	constructor(private http: Http) {
		this.headers = {
			headers: new Headers({
				'X-TBA-Auth-Key': 'ELtzMeSgbHtY08BzpXoFBb0CbcqShUVDF7kYrVnaoIQiIDLlI9hw4kQtLNFhdNmq'
			})
		};
	}

	private teamToPage(teamNumber: number): number {
		return Math.floor(teamNumber/500);
	}

	private getTeamsPage(num: number): Promise<BlueTeam> {
		return this.http.get(this.baseUrl + '/teams/' + num + '/keys', this.headers)
			.toPromise()
			.then((response) => response.json());
	}

	public getTeam(teamNumber: number): Promise<BlueTeam> {
		return this.http.get(this.baseUrl + '/team/frc' + teamNumber, this.headers)
			.toPromise()
			.then((response) => response.json());
	}

}
