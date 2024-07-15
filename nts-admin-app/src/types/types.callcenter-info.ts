type ServerInfoType = {
	ip: string;
	port: number;
	id: string;
	pw: string;
};

type SSLVPNInfoType = ServerInfoType & {
	isDirect: boolean;
};
type ServerType = ServerInfoType & {
	portForwarding: number;
};

type DBInfoType = {
	dbName: string;
	dbPort: number;
	portForwarding: number;
	onnaraDBName?: string;
};

export type CallCenterInfoType = {
	mainInsuranceName: string;
	insuranceNameList: string[];
	sponsorName: string;
	agencyName: string;
	centerName: string;
	SSLVPN: SSLVPNInfoType;
	DBServer: ServerType;
	AppServer: ServerType;
	dbInfo: DBInfoType;
	centerOpenData: Date | null;
};

// export class CallCenterInfoClass {
// 	private mainInsuranceCode: string;
// 	private insuranceCodeList: string[];
// 	private sponsorNo: number;
// 	private agencyName: string;
// 	private centerName: string;
// 	private SSLVPN: SSLVPNInfoType;
// 	private DBServer: ServerType;
// 	private AppServer: ServerType;
// 	private dbInfo: DBInfoType;
//
// 	constructor(
// 		mainInsuranceCode: string,
// 		insuranceCodeList: string[],
// 		sponsorNo: number,
// 		agencyName: string,
// 		centerName: string,
// 		SSLVPN: SSLVPNInfoType,
// 		DBServer: ServerType,
// 		AppServer: ServerType,
// 		dbInfo: DBInfoType,
// 	) {
// 		this.mainInsuranceCode = mainInsuranceCode;
// 		this.insuranceCodeList = insuranceCodeList;
// 		this.sponsorNo = sponsorNo;
// 		this.agencyName = agencyName;
// 		this.centerName = centerName;
// 		this.SSLVPN = SSLVPN;
// 		this.DBServer = DBServer;
// 		this.AppServer = AppServer;
// 		this.dbInfo = dbInfo;
// 	}
//
// 	getInsuranceName() {
// 		const optionsStore = useOptionsStore();
// 		const { getInsuranceOptions } = storeToRefs(optionsStore);
//
// 		const mainInsuranceName =
// 			getInsuranceOptions.value.find((option) => option.key === this.mainInsuranceCode)?.value ||
// 			'';
//
// 		if (this.insuranceCodeList.length > 1)
// 			return `${mainInsuranceName} 외 ${this.insuranceCodeList.length - 1}`;
// 		else return mainInsuranceName;
// 	}
// 	getInsuranceNameList() {
// 		const optionsStore = useOptionsStore();
// 		const { getInsuranceOptions } = storeToRefs(optionsStore);
//
// 		return getInsuranceOptions.value
// 			.filter((option) => this.insuranceCodeList.some((key) => option.key === key))
// 			.map((option) => option.value);
// 	}
// 	getInsuranceCodeList() {
// 		return this.insuranceCodeList;
// 	}
// 	setInsuranceCodeList(newValue: string[]) {
// 		this.insuranceCodeList = newValue;
// 	}
//
// 	getSponsorName() {
// 		const sponsorStore = useSponsorStore();
// 		const { getSponsorList } = storeToRefs(sponsorStore);
//
// 		return getSponsorList.value.find((option) => option.idx === this.sponsorNo)?.name || '';
// 	}
// 	setSponsorNo(newValue: number) {
// 		this.sponsorNo = newValue;
// 	}
// }
