import { createRouter, createWebHistory } from 'vue-router';
import NAView from '@/views/AppMainView.vue';
import InsuranceSponsorManagementView from '@/views/InsuranceAndSponsorManagement/InsuranceAndSponsorManagementView.vue';
import ManagerManagementView from '@/views/ManagerManagement/ManagerManagementView.vue';
import CallCenterInfoManagementView from '@/views/CallCenterInfoManagement/CallCenterInfoManagementView.vue';
import NTSAppManagementView from '@/views/NTSAppManagement/NTSAppManagementView.vue';
import DeployManagementView from '@/views/DeployManagement/DeployManagementView.vue';
import AppMainView from '@/views/AppMainView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/login',
			name: 'login',
			component: NAView,
		},
		{
			path: '/nts-admin',
			name: 'NTS Admin',
			component: AppMainView,
			children: [
				{
					path: 'insurance-sponsor',
					name: 'Insurance Sponsor',
					component: InsuranceSponsorManagementView,
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
