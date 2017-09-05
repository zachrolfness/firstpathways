import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from '../database-service/database.service';

@Component({
  selector: 'resource-card',
  templateUrl: './resourcecard.component.html',
  styleUrls: ['./resourcecard.component.css']
})
export class ResourcecardComponent implements OnInit {

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

	@Input() resource;

	username;

	constructor(private db: DatabaseService) { }

	ngOnInit() {
		// change the uid to this.resource.UserID
		this.db.getUserName('FMvY4qreRZa90nEzcl8q706yRdw1')
			.then((username) => this.username = username);
	}

}
