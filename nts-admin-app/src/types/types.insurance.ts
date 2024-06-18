export type InsuranceType = {
	idx: number;
	code: string;
	name: string;
	suffix: string;
	NTSTeamId?: number;
};

export type RequestAddInsuranceType = {
	code: string;
	name: string;
	suffix: string;
	NTSTeamId?: number;
};
