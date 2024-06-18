import { createRouter, createWebHistory } from 'vue-router';
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
