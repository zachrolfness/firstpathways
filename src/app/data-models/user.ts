export interface User {
	uid: string;
	name: string;
	email: string;
	photoUrl?: string;
	bio?: string;
	website?: string;
	pathwayTeams?: Team[]
}

export interface Team {
	name: string;
	number: number;
	branch: string;
	school: string;
}
