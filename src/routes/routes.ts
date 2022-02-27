const routes: any = {
  // -------- Authorized routes start -------- //
  dashboard: {
    path: '/dashboard',
    title: 'My Designs',
    exact: true,
  },
  dashboardAccounts: {
    path: '/payment-accounts',
    exact: true,
  },
  addTeamMember: {
    path: '/team-members/new',
    exact: true,
  },
  dashboardPayments: {
    path: '/payments',
    exact: true,
  },
  dashboardPaymentsApproval: {
    path: '/payment-approvals',
    exact: true,
  },
  dashboardNotifications: {
    path: '/notifications',
    exact: true,
  },
  dashboardTeamMembers: {
    path: '/team-members',
    exact: true,
  },
  addPendingPayments: {
    path: '/payment/new',
    exact: true,
  },
  dashboardSettings: {
    path: '/settings',
    exact: true,
  },
  getCompanyById: {
    path: '/payment-account/:id',
    exact: true,
  },
  editCompanyById: {
    path: '/company/:id',
    exact: true,
  },
  createCompany: {
    path: '/payment-accounts/new',
    exact: true,
  },
  // -------- Authorized routes end -------- //

  // -------- Guest routes start -------- //
  home: {
    path: '/',
    exact: true,
  },
  payeeSelfOnBoarding: {
    path: '/payment-accounts/:id/payee-self-onboarding',
    exact: true
  },
  payeeApprovePayments: {
    path: '/payments/:id',
    exact: true
  },
  success: {
    path: '/success',
    exact: true
  },
  signIn: {
    path: '/sign-in',
    exact: true,
  },
  signUp: {
    path: '/sign-up',
    exact: true,
  },
  signUpEmailConfirmation: {
    path: '/auth/confirm-user',
  },
  resetPassword: {
    path: '/reset-password',
  },
  resetPasswordNewPassword: {
    path: '/reset-password/new-password',
  },
  signUpSuccessful: {
    path: '/sign-up/successful',
  },
  termsAndCondition: {
    path: '/terms-and-conditions',
  },
  privacyPolicy: {
    path: '/privacy-policy',
  },
  // -------- Guest routes end -------- //
};

export default routes;
