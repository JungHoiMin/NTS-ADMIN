import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { secureLocalStorage } from '@/modules/storages';

type ThemeType = 'white' | 'dark';
type PlacementType =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'right'
	| 'right-start'
	| 'right-end';
type SizeType = 'large' | 'default' | 'small';
type TriggerType = 'hover' | 'click' | 'focus' | 'contextmenu';
type PlatformType = 'browser' | 'exe';

export type PersonalOptionsType = {
	theme: ThemeType;
	size: SizeType;
	showHint: boolean;
	hintTrigger: TriggerType;
	hintPlacement: PlacementType;
	usePlatform: PlatformType;
	isCollapse: boolean;
	showNetAddress: boolean;
	showDetail: boolean;
	detailTrigger: TriggerType;
	detailPlacement: PlacementType;
	useAndFilter: boolean;
};

export const usePersonalOptionsSettingStore = defineStore('personalOptionsSetting', () => {
	// NOTE:: 테마 모드 설정
	const theme = ref<ThemeType>(secureLocalStorage.getItem<ThemeType>('theme') || 'white');
	const getTheme = computed(() => theme.value);
	const setTheme = (option: ThemeType) => {
		const htmlEl = document.querySelector('html') as HTMLElement;
		theme.value = option;
		secureLocalStorage.setItem('theme', option);
		htmlEl.className = theme.value === 'white' ? '' : theme.value;
	};

	// NOTE:: 크기 옵션
	const size = ref<SizeType>(secureLocalStorage.getItem<SizeType>('size') || 'default');
	const getSize = computed(() => size.value);
	const getTableRowClassOfHeight = computed(() => {
		if (size.value === 'small') return 'h-36';
		else if (size.value === 'large') return 'h-66';
		else return 'h-50';
	});
	const setSize = (option: SizeType) => {
		size.value = option;
		secureLocalStorage.setItem('size', option);
	};

	// NOTE:: 검색창을 펼쳐둘 것인지에 대한 옵션
	const isCollapse = ref<boolean>(secureLocalStorage.getItem<boolean>('isCollapse') || false);
	const getIsCollapse = computed(() => isCollapse.value);
	const setIsCollapse = (option: boolean) => {
		isCollapse.value = option;
		secureLocalStorage.setItem('isCollapse', option);
	};

	// NOTE:: 웹사이트로 이용하는지에 대한 옵션
	const usePlatform = ref<PlatformType>(
		secureLocalStorage.getItem<PlatformType>('usePlatform') || 'exe',
	);
	const getUsePlatform = computed(() => usePlatform.value);
	const setUsePlatform = (option: PlatformType) => {
		usePlatform.value = option;
		secureLocalStorage.setItem('usePlatform', option);
	};

	// NOTE:: IP, PORT 보기 옵션
	const showNetAddress = ref<boolean>(
		secureLocalStorage.getItem<boolean>('showNetAddress') || true,
	);
	const getShowNetAddress = computed(() => showNetAddress.value);
	const setShowNetAddress = (option: boolean) => {
		showNetAddress.value = option;
		secureLocalStorage.setItem('showNetAddress', option);
	};

	// NOTE:: Hint 보기 옵션
	const showHint = ref<boolean>(secureLocalStorage.getItem<boolean>('showHint') || true);
	const getShowHint = computed(() => showHint.value);
	const setShowHint = (option: boolean) => {
		showHint.value = option;
		secureLocalStorage.setItem('showHint', option);
	};
	const hintTrigger = ref<TriggerType>(
		secureLocalStorage.getItem<TriggerType>('hintTrigger') || 'focus',
	);
	const getHintTrigger = computed(() => hintTrigger.value);
	const setHintTrigger = (option: TriggerType) => {
		hintTrigger.value = option;
		secureLocalStorage.setItem('hintTrigger', option);
	};
	const hintPlacement = ref<PlacementType>(
		secureLocalStorage.getItem<PlacementType>('hintPlacement') || 'top',
	);
	const getHintPlacement = computed(() => hintPlacement.value);
	const setHintPlacement = (option: PlacementType) => {
		hintPlacement.value = option;
		secureLocalStorage.setItem('hintPlacement', option);
	};

	// NOTE:: 자세한 정보 보기 옵션
	const showDetail = ref<boolean>(secureLocalStorage.getItem<boolean>('showDetail') || true);
	const getShowDetail = computed(() => showDetail.value);
	const setShowDetail = (option: boolean) => {
		showDetail.value = option;
		secureLocalStorage.setItem('showDetail', option);
	};
	const detailTrigger = ref<TriggerType>(
		secureLocalStorage.getItem<TriggerType>('detailTrigger') || 'hover',
	);
	const getDetailTrigger = computed(() => detailTrigger.value);
	const setDetailTrigger = (option: TriggerType) => {
		detailTrigger.value = option;
		secureLocalStorage.setItem('detailTrigger', option);
	};
	const detailPlacement = ref<PlacementType>(
		secureLocalStorage.getItem<PlacementType>('detailPlacement') || 'top',
	);
	const getDetailPlacement = computed(() => detailPlacement.value);
	const setDetailPlacement = (option: PlacementType) => {
		detailPlacement.value = option;
		secureLocalStorage.setItem('detailPlacement', option);
	};

	// NOTE:: 센터 정보 관리 검색 시 And조건으로 검색할지 Or조건으로 검색할 지에 대한 옵션
	const useAndFilter = ref<boolean>(secureLocalStorage.getItem<boolean>('useAndFilter') || true);
	const getUseAndFilter = computed(() => useAndFilter.value);
	const setUseAndFilter = (option: boolean) => {
		useAndFilter.value = option;
		secureLocalStorage.setItem('useAndFilter', option);
	};

	return {
		getTheme,
		setTheme,
		getSize,
		getTableRowClassOfHeight,
		setSize,
		getIsCollapse,
		setIsCollapse,
		getUsePlatform,
		setUsePlatform,
		getShowNetAddress,
		setShowNetAddress,
		getShowHint,
		setShowHint,
		getHintTrigger,
		setHintTrigger,
		getHintPlacement,
		setHintPlacement,
		getShowDetail,
		setShowDetail,
		getDetailTrigger,
		setDetailTrigger,
		getDetailPlacement,
		setDetailPlacement,
		getUseAndFilter,
		setUseAndFilter,
	};
});
