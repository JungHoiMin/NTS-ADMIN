export type ManagerType = {
	id: string;
	name: string;
	teamId: number;
	teamType: 'NTS' | 'AM';
	joinDate: Date | null;
};

export type RequestAddManagerType = {
	id: string;
	pw: string;
	name: string;
	teamId: number;
	teamType: 'NTS' | 'AM';
	joinDate: Date | null;
};

export type RequestUpdateManagerType = {
	name: string;
	prevPw: string;
	pw: string;
	teamId: number;
	teamType: 'NTS' | 'AM';
	joinDate: Date | null;
};
