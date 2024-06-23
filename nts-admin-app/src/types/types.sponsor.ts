export type SponsorType = {
	idx: number;
	name: string;
	suffix: string;
};

export type RequestAddSponsorType = {
	name: string;
	suffix: string;
};

export type RequestUpdateSponsorType = {
	suffix: string;
};
