import { Injectable } from '@angular/core';

import { DatabaseService } from '../database-service/database.service';

@Injectable()
export class TagsService {

	constructor(private db: DatabaseService) { }

	public tagsUpdate(items): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.db.getTagsObject().then((snapshot) => resolve(this.getTags(items, snapshot)));
		});
	}

	private getTags(items, snapshot): string[] {
		switch(items.length) {
			case 0: return ['FRC', 'FTC', 'FLL', 'FLLjr', 'General'];
			case 1: return Object.keys(snapshot[items[0].value]);
			case 2: return (<any>Object).values(snapshot[items[0].value][items[1].value]);
			case 3: return [items[items.length-1].value];
		}
	}
}
