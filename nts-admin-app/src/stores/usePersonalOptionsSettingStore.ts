import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

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

export const usePersonalOptionsSettingStore = defineStore(
	'personalOptionsSetting',
	() => {
		// NOTE:: 테마 모드 설정
		const theme = ref<ThemeType>('white');
		const getTheme = computed(() => theme.value);
		const setTheme = (option: ThemeType) => {
			const htmlEl = document.querySelector('html') as HTMLElement;
			theme.value = option;
			htmlEl.className = theme.value === 'white' ? '' : theme.value;
		};

		// NOTE:: 글자 크기 옵션
		const textSize = ref<SizeType>('default');
		const getTextSize = computed(() => textSize.value);
		const setTextSize = (option: SizeType) => {
			textSize.value = option;
		};

		// NOTE:: 버튼 크기 옵션
		const buttonSize = ref<SizeType>('default');
		const getButtonSize = computed(() => buttonSize.value);
		const setButtonSize = (option: SizeType) => {
			buttonSize.value = option;
		};

		// NOTE:: 검색창을 펼쳐둘 것인지에 대한 옵션
		const isCollapse = ref<boolean>(false);
		const getIsCollapse = computed(() => isCollapse.value);
		const setIsCollapse = (option: boolean) => {
			isCollapse.value = option;
		};

		// NOTE:: 웹사이트로 이용하는지에 대한 옵션
		const useWebBrowser = ref<boolean>(false);
		const getUseWebBrowser = computed(() => useWebBrowser.value);
		const setUseWebBrowser = (option: boolean) => {
			useWebBrowser.value = option;
		};

		// NOTE:: IP, PORT 보기 옵션
		const showNetAddress = ref<boolean>(true);
		const getShowNetAddress = computed(() => showNetAddress.value);
		const setShowNetAddress = (option: boolean) => {
			showNetAddress.value = option;
		};

		// NOTE:: Hint 보기 옵션
		const showHint = ref<boolean>(true);
		const getShowHint = computed(() => showHint.value);
		const setShowHint = (option: boolean) => {
			showHint.value = option;
		};
		const hintTrigger = ref<TriggerType>('focus');
		const getHintTrigger = computed(() => hintTrigger.value);
		const setHintTrigger = (option: TriggerType) => {
			hintTrigger.value = option;
		};
		const hintPlacement = ref<PlacementType>('top');
		const getHintPlacement = computed(() => hintPlacement.value);
		const setHintPlacement = (option: PlacementType) => {
			hintPlacement.value = option;
		};

		// NOTE:: 자세한 정보 보기 옵션
		const showDetail = ref<boolean>(true);
		const getShowDetail = computed(() => showDetail.value);
		const setShowDetail = (option: boolean) => {
			showDetail.value = option;
		};
		const detailTrigger = ref<TriggerType>('hover');
		const getDetailTrigger = computed(() => detailTrigger.value);
		const setDetailTrigger = (option: TriggerType) => {
			detailTrigger.value = option;
		};
		const detailPlacement = ref<PlacementType>('top');
		const getDetailPlacement = computed(() => detailPlacement.value);
		const setDetailPlacement = (option: PlacementType) => {
			detailPlacement.value = option;
		};

		return {
			getTheme,
			setTheme,
			getTextSize,
			setTextSize,
			getButtonSize,
			setButtonSize,
			getIsCollapse,
			setIsCollapse,
			getUseWebBrowser,
			setUseWebBrowser,
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
		};
	},
	{
		persist: true,
	},
);
