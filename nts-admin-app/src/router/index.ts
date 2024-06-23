import {
	createRouter,
	createWebHistory,
	type NavigationGuardNext,
	type RouteLocationNormalized,
} from 'vue-router';
import ManagerManagementView from '@/views/ManagerManagement/ManagerManagementView.vue';
import CallCenterInfoManagementView from '@/views/CallCenterInfoManagement/CallCenterInfoManagementView.vue';
import NTSAppManagementView from '@/views/NTSAppManagement/NTSAppManagementView.vue';
import DeployManagementView from '@/views/DeployManagement/DeployManagementView.vue';
import AppMainView from '@/views/AppMainView.vue';
import AppLoginView from '@/views/AppLoginView.vue';
import AppSignupView from '@/views/AppSignupView.vue';
import SponsorManagementView from '@/views/SponsorManagement/SponsorManagementView.vue';
import InsuranceManagementView from '@/views/InsuranceManagement/InsuranceManagementView.vue';
import InsuranceListTable from '@/components/Insurance/InsuranceListTable.vue';
import SponsorListTable from '@/components/Sponsor/SponsorListTable.vue';
import AddInsurance from '@/components/Insurance/AddInsurance.vue';
import AddSponsor from '@/components/Sponsor/AddSponsor.vue';
import { secureSessionStorage } from '@/modules/storages';
import { setAuthorizationToken } from '@/modules/apis';
import EditInsurance from '@/components/Insurance/EditInsurance.vue';
import EditSponsor from '@/components/Sponsor/EditSponsor.vue';

const checkAuth =
	() => (from: RouteLocationNormalized, to: RouteLocationNormalized, next: NavigationGuardNext) => {
		const item = secureSessionStorage.getItem<{ token: string }>('token');
		if (item === null) next({ name: 'Login' });
		else {
			setAuthorizationToken(item.token);
			next();
		}
	};

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: { name: 'Login' },
		},
		{
			path: '/login',
			name: 'Login',
			component: AppLoginView,
		},
		{
			path: '/signup',
			name: 'Sign Up',
			component: AppSignupView,
		},
		{
			path: '/nts-admin',
			name: 'NTS Admin',
			component: AppMainView,
			beforeEnter: checkAuth(),
			children: [
				{
					path: 'insurance',
					name: 'Insurance',
					component: InsuranceManagementView,
					children: [
						{
							path: '',
							name: 'Insurance List',
							component: InsuranceListTable,
						},
						{
							path: 'add',
							name: 'Add Insurance',
							component: AddInsurance,
						},
						{
							path: 'edit/:idx',
							name: 'Edit Insurance',
							component: EditInsurance,
							props: true,
						},
					],
				},
				{
					path: 'sponsor',
					name: 'Sponsor',
					component: SponsorManagementView,
					children: [
						{
							path: '',
							name: 'Sponsor List',
							component: SponsorListTable,
						},
						{
							path: 'add',
							name: 'Add Sponsor',
							component: AddSponsor,
						},
						{
							path: 'edit/:idx',
							name: 'Edit Sponsor',
							component: EditSponsor,
							props: true,
						},
					],
				},
				{
					path: 'manager',
					name: 'Manager',
					component: ManagerManagementView,
				},
				{
					path: 'call-center',
					name: 'Call Center',
					component: CallCenterInfoManagementView,
				},
				{
					path: 'nts-app',
					name: 'NTS App',
					component: NTSAppManagementView,
				},
				{
					path: 'deploy',
					name: 'Deploy',
					component: DeployManagementView,
				},
			],
		},
	],
});

export default router;
