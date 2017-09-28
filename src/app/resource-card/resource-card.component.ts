import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from '../database-service/database.service';

/*
* Notes for the resource card:
*
* Make sure the top color corresponds to the branch of FIRST from the main tag
* FLL Jr Hex Color:00a651
* FLL Hex Color: ed1c24
* FTC Hex Color: f57e25
* FRC Hex Color: 009cd7
* General Hex Color: 727272
*/

@Component({
	selector: 'resource-card',
	templateUrl: './resource-card.component.html',
	styleUrls: ['./resource-card.component.css']
})
export class ResourceCardComponent implements OnInit {

	@Input() resource;

	username: string;

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		this.db.getUserName(this.resource.User)
			.then((username) => this.username = username);
	}

	getHeadingColor(branch: string): string {
		switch(branch) {
			case 'FRC': return 'frccolor';
			case 'FTC': return 'ftccolor';
			case 'FLL': return 'fllcolor';
			case 'FLL Jr': return 'flljrcolor';
			default: return 'bg-primary';
		}
	}

	getBadgeColor(branch: string): string {
		switch(branch) {
			case 'FRC': return 'frccolor';
			case 'FTC': return 'ftccolor';
			case 'FLL': return 'fllcolor';
			case 'FLL Jr': return 'flljrcolor';
			default: return 'badge-primary';
		}
	}
}
