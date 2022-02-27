import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import withSuspense from 'hocs/with-suspense';

import SignInPage from 'pages/sign-in/sign-In';
import SignUpPage from 'pages/sign-up/sign-up';
import SignUpSuccessFull from 'pages/sign-up-successful/confirm-email-page';
import SignUpEmailConfirmation from 'pages/sign-up-email-confirmation/sign-up-email-confirmation';
import ResetPasswordPage from 'pages/resetPassword/reset-password';
import ResetPasswordNewPasswordPage from 'pages/reset-password-new-password/reset-password-new-password';
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardAccounts from '../components/organisms/dashboard-accounts/dashboard-accounts';
import DashboardPayments from '../components/organisms/dashboard-payments/dashboard-payments';
import DashboardSettings from '../components/organisms/dashboard-settings/dashboard-settings';
import CreatePaymentAccountSteps from '../components/organisms/create-cpayment-account/create-payment-account-steps';
import TeamMembers from '../components/organisms/dashboard-team-members/team-members';
import PendingPayments from '../components/organisms/dashboard-pending-payments/pending-payments';
import AddTeamMember from '../components/organisms/add-team-member/add-team-member';
import PayeeApprovePayment from '../pages/payee-aprove-payment/payee-approve-payment';
import AddPendingPayments from '../components/organisms/add-pending-payments/add-pending-payments';
import DashboardNotifications from '../components/organisms/dashboard-notifications/dashboard-notifications';
import PayeeSelfOnBoarding from '../pages/payee-self-onboarding/payee-self-onboarding';
import SuccessPage from '../pages/success-page/success-page';
import { PrivateRoute } from '../services/private-router';

import GuestRoute from './Guest/guest-route';
import routes from './routes';
import EditCompany from '../components/organisms/edit-company/edit-company';

const NotFound = lazy(() => import('pages/not-found/not-found-page'));
// Authorized pages start
const Home = lazy(() => import('pages/home/home'));
// Authorized pages end

const Routes: React.FC<any> = (): JSX.Element => {
  return (
    <Switch>
      {/*<AuthRoute exact path={routes.dashboard.path} component={suspense(Home, <div />)} />*/}

      <GuestRoute exact path={routes.home.path} component={withSuspense(Home)} />
      <GuestRoute exact path={routes.signIn.path} component={SignInPage} />
      <GuestRoute exact path={routes.signUp.path} component={SignUpPage} />


      <GuestRoute exact path={routes.signUpSuccessful.path} component={SignUpSuccessFull} />

      <Route exact path={routes.resetPasswordNewPassword.path} component={ResetPasswordNewPasswordPage} />
      <Route exact path={routes.signUpEmailConfirmation.path} component={SignUpEmailConfirmation} />
      <Route exact path={routes.success.path} component={SuccessPage} />
      <Route exact path={routes.resetPassword.path} component={ResetPasswordPage} />
      <Route exact path={routes.dashboard.path} component={Dashboard} />
      <Route exact path={routes.payeeSelfOnBoarding.path} component={PayeeSelfOnBoarding} />
      <Route exact={routes.payeeApprovePayments.exact}
             path={routes.payeeApprovePayments.path}
             component={PayeeApprovePayment} />
      <PrivateRoute
        exact={routes.dashboardAccounts.exact}
        path={routes.dashboardAccounts.path}
        layout={Dashboard}
        component={DashboardAccounts}
      />
      <PrivateRoute
        exact={routes.dashboardNotifications.exact}
        path={routes.dashboardNotifications.path}
        layout={Dashboard}
        component={DashboardNotifications}
      />
      <PrivateRoute
        exact={routes.dashboardTeamMembers.exact}
        path={routes.dashboardTeamMembers.path}
        layout={Dashboard}
        component={TeamMembers}
      />
      <PrivateRoute
        exact={routes.addTeamMember.exact}
        path={routes.addTeamMember.path}
        layout={Dashboard}
        component={AddTeamMember}
      />
      <PrivateRoute
        exact={routes.addPendingPayments.exact}
        path={routes.addPendingPayments.path}
        layout={Dashboard}
        component={AddPendingPayments}
      />
      <PrivateRoute
        exact={routes.dashboardPaymentsApproval.exact}
        path={routes.dashboardPaymentsApproval.path}
        layout={Dashboard}
        component={DashboardPayments}
      />
      <PrivateRoute
        exact={routes.dashboardPayments.path}
        path={routes.dashboardPayments.path}
        layout={Dashboard}
        component={PendingPayments}
      />
      <PrivateRoute
        exact={routes.dashboardSettings.exact}
        path={routes.dashboardSettings.path}
        layout={Dashboard}
        component={DashboardSettings}
      />
      <PrivateRoute
        exact={routes.getCompanyById.exact}
        path={routes.getCompanyById.path}
        layout={Dashboard}
        component={EditCompany}
      />
      <PrivateRoute
        exact={routes.createCompany.exact}
        path={routes.createCompany.path}
        layout={Dashboard}
        component={CreatePaymentAccountSteps}
      />
      <PrivateRoute
        exact={routes.editCompanyById.exact}
        path={routes.editCompanyById.path}
        layout={Dashboard}
        component={CreatePaymentAccountSteps}
      />
      <Route exact path='*' component={withSuspense(NotFound)} />
    </Switch>
  );
};

export default Routes;
