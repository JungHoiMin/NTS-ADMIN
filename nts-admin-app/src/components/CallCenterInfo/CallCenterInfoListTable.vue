<script setup lang="ts">
import CallCenterInfoSearchOptions from '@/components/CallCenterInfo/CallCenterInfoSearchOptions.vue';
import type { SelectedOptionInterface } from '@/types/types.options';
import { computed, ref } from 'vue';
import type { CallCenterInfoType } from '@/types/types.callcenter-info';
import { usePersonalOptionsSettingStore } from '@/stores/usePersonalOptionsSettingStore';
import { storeToRefs } from 'pinia';
import AppPopover from '@/components/AppPopover.vue';
import dayjs from 'dayjs';

const personalOptionsSettingStore = usePersonalOptionsSettingStore();
const { getUseAndFilter, getSize, getTableRowClassOfHeight } = storeToRefs(
	personalOptionsSettingStore,
);

const callcenterInfoList = ref<CallCenterInfoType[]>([
	{
		mainInsuranceName: '라이나생명',
		insuranceNameList: ['ACE손보', '라이나생명', 'DB손보', 'DB생명'],
		sponsorName: '아이스크림에듀',
		agencyName: 'G&C',
		centerName: 'ACE손보 삼성카드 안양',
		SSLVPN: {
			ip: '192.166.240.111',
			port: 1232,
			id: 'dsc_admin',
			pw: 'q1w2e3r4*',
			isDirect: false,
		},
		DBServer: {
			ip: '192.166.240.111',
			port: 2241,
			id: 'nts_man',
			pw: '^ghlals%01',
			portForwarding: 1102,
		},
		AppServer: {
			ip: '192.166.240.111',
			port: 1135,
			id: 'nts_man',
			pw: '^ghlals%01',
			portForwarding: 1103,
		},
		dbInfo: {
			portForwarding: 1104,
			dbPort: 8832,
			dbName: 'CallCenterDB_HANHWAINSURE_CJO_SONGNAE',
		},
		centerOpenData: new Date(),
	},
]);
const searchText = ref<string>('');

const getCallCenterInfoList = computed<CallCenterInfoType[]>(() => {
	const keywordList = searchText.value.split(' ');
	if (keywordList.length === 0) return callcenterInfoList.value;

	return callcenterInfoList.value.filter((info) => {
		if (info.sponsorName.includes(searchText.value)) return true;

		if (info.agencyName.includes(searchText.value)) return true;

		if (info.SSLVPN.ip.includes(searchText.value)) return true;

		if (info.DBServer.ip.includes(searchText.value)) return true;

		if (info.AppServer.ip.includes(searchText.value)) return true;

		if (getUseAndFilter) {
			return keywordList.every((keyword) => info.centerName.includes(keyword));
		} else {
			return keywordList.some((keyword) => info.centerName.includes(keyword));
		}
	});
});

const getInsuranceName = (info: CallCenterInfoType) => {
	if (info.insuranceNameList.length > 1)
		return `${info.mainInsuranceName} 외 ${info.insuranceNameList.length - 1}`;
	else return info.mainInsuranceName;
};
const getInsuranceNameList = (info: CallCenterInfoType) => info.insuranceNameList.join(', ');

const getCenterOpenDate = (info: CallCenterInfoType) =>
	info.centerOpenData !== null ? dayjs(info.centerOpenData).format('YYYY-MM-DD') : '';

const onChangeSelectedOption = (options: SelectedOptionInterface): void => {
	console.log(options);
};
const onChangeSearchText = (text: string): void => {
	searchText.value = text;
};

const getAddress = (info: CallCenterInfoType, prop: 'SSLVPN' | 'DBServer' | 'AppServer') => {
	return `${info[prop].ip}:${info[prop].port}`;
};

const getColumnWith = (
	prop:
		| 'insurance'
		| 'sponsor'
		| 'centerName'
		| 'SSLVPN'
		| 'DBServer'
		| 'AppServer'
		| 'DB'
		| 'centerOpenDate',
) => {
	let result = 100;
	if (getSize.value === 'small') {
		switch (prop) {
			case 'insurance':
				result = 96;
				break;
			case 'sponsor':
				result = 94;
				break;
			case 'centerName':
				result = 170;
				break;
			case 'SSLVPN':
			case 'DBServer':
			case 'AppServer':
				result = 222;
				break;
			case 'DB':
				result = 64;
				break;
			case 'centerOpenDate':
				result = 78;
				break;
		}
	} else if (getSize.value === 'default') {
		switch (prop) {
			case 'insurance':
				result = 118;
				break;
			case 'sponsor':
				result = 116;
				break;
			case 'centerName':
				result = 202;
				break;
			case 'SSLVPN':
			case 'DBServer':
			case 'AppServer':
				result = 272;
				break;
			case 'DB':
				result = 82;
				break;
			case 'centerOpenDate':
				result = 96;
				break;
		}
	} else {
		switch (prop) {
			case 'insurance':
				result = 126;
				break;
			case 'sponsor':
				result = 124;
				break;
			case 'centerName':
				result = 210;
				break;
			case 'SSLVPN':
			case 'DBServer':
			case 'AppServer':
				result = 296;
				break;
			case 'DB':
				result = 98;
				break;
			case 'centerOpenDate':
				result = 104;
				break;
		}
	}
	return result;
};
</script>

<template>
	<CallCenterInfoSearchOptions
		@change:options="onChangeSelectedOption"
		@change:searchText="onChangeSearchText"
	/>
	<el-table
		class="app-table-section"
		:data="getCallCenterInfoList"
		:size="getSize"
		:row-class-name="`table-row ${getTableRowClassOfHeight}`"
	>
		<el-table-column label="보험사" :width="getColumnWith('insurance')">
			<template #default="scope">
				<app-popover>
					<template #default>
						{{ getInsuranceNameList(scope.row as CallCenterInfoType) }}
					</template>
					<template #reference>
						<span class="flowText">{{ getInsuranceName(scope.row as CallCenterInfoType) }}</span>
					</template>
				</app-popover>
			</template>
		</el-table-column>
		<ElTableColumn label="스폰서사" prop="sponsorName" :width="getColumnWith('sponsor')" />
		<el-table-column label="센터명" :min-width="getColumnWith('centerName')">
			<template #default="scope">
				[{{ (scope.row as CallCenterInfoType).agencyName }}]
				{{ (scope.row as CallCenterInfoType).centerName }}
			</template>
		</el-table-column>
		<el-table-column label="SSLVPN" :width="getColumnWith('SSLVPN')">
			<template #default="scope">
				<el-button :size="getSize">
					{{ getAddress(scope.row as CallCenterInfoType, 'SSLVPN') }}
				</el-button>
				<el-button :size="getSize">원격</el-button>
			</template>
		</el-table-column>
		<el-table-column label="DB Server" :width="getColumnWith('DBServer')">
			<template #default="scope">
				<el-button :size="getSize">
					{{ getAddress(scope.row as CallCenterInfoType, 'DBServer') }}
				</el-button>
				<el-button :size="getSize">원격</el-button>
			</template>
		</el-table-column>
		<el-table-column label="App Server" :width="getColumnWith('AppServer')">
			<template #default="scope">
				<el-button :size="getSize">
					{{ getAddress(scope.row as CallCenterInfoType, 'AppServer') }}
				</el-button>
				<el-button :size="getSize">원격</el-button>
			</template>
		</el-table-column>
		<el-table-column label="DB" :width="getColumnWith('DB')">
			<el-button :size="getSize"> 복사 </el-button>
		</el-table-column>
		<el-table-column label="센터오픈일" :width="getColumnWith('centerOpenDate')">
			<template #default="scope">
				{{ getCenterOpenDate(scope.row as CallCenterInfoType) }}
			</template>
		</el-table-column>
	</el-table>
</template>
