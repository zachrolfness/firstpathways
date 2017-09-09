export interface Team {
	name: string;
	number: number;
	branch: string;
	school: string;
}

export interface BlueTeam {
	postal_code?: string;
	home_championship?: {
		description: string
	};
	lng?:	number;
	rookie_year: number;
	city?: string;
	name: string;
	team_number: number;
	motto?: string;
	nickname?: string;
	gmaps_url?: string;
	gmaps_place_id?: string;
	address?: string;
	location_name?: string;
	country?: string;
	state_prov?: string;
	website?: string;
	lat?: number;
	key: string;
}
