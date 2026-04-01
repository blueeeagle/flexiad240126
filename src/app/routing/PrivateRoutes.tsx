import { lazy, FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { Dashboard } from "../pages/dashboard/Dashboard";
import UserRoles from "../pages/admin/userRoles/UserRoles";
import UserRoleDetail from "../pages/admin/userRoles/UserRoleDetail";
import AdminUserList from "../pages/admin/adminUsers/UserList";
import AdminUserDetail from "../pages/admin/adminUsers/UserDetail";
import CurrencyList from "../pages/masters/currency/CurrencyList";
import CurrencyDetail from "../pages/masters/currency/CurrencyDetail";
import CountryList from "../pages/masters/country/CountryList";
import CountryDetail from "../pages/masters/country/CountryDetail";
import StateList from "../pages/masters/state/StateList";
import StateDetail from "../pages/masters/state/StateDetail";
import CityList from "../pages/masters/city/CityList";
import CityDetail from "../pages/masters/city/CityDetail";
import AreaList from "../pages/masters/area/AreaList";
import AreaDetail from "../pages/masters/area/AreaDetail";
import ServiceList from "../pages/masters/service/ServiceList";
import ServiceDetail from "../pages/masters/service/ServiceDetail";

import CategoryList from "../pages/masters/category/CategoryList";
import CategoryDetail from "../pages/masters/category/CategoryDetail";
import ItemList from "../pages/masters/items/ItemList";
import ItemDetail from "../pages/masters/items/ItemDetail";
import CompanyInfo from "../pages/settings/CompanyInfo";
import AppSettings from "../pages/settings/AppSettings";
import RateSettings from "../pages/settings/RateSettings";
import Cancellations from "../pages/settings/Cancellations";
import TaxList from "../pages/settings/tax/TaxList";
import TaxDetail from "../pages/settings/tax/TaxDetail";
import CurrencyRates from "../pages/settings/CurrencyRates";
import AgentList from "../pages/agents/AgentList";
import { MenuTestPage } from "../pages/MenuTestPage";
import AgentProfile from "../pages/agents/profile/AgentProfile";
import AgentUpdate from "../pages/agents/AgentUpdate";
import LocationCharges from "../pages/agents/LocationCharges";
import AgentUsers from "../pages/agents/users/Users";
import AgentUserDetail from "../pages/agents/users/UserDetail";
import AgentWallet from "../pages/agents/wallet/Wallet";
import AgentStatistics from "../pages/agents/Statistics";
import AgentOrders from "../pages/agents/Orders";
import AgentItems from "../pages/agents/AgentItems";
import AgentSubscriptions from "../pages/agents/Subscriptions";
import AgentTimeslots from "../pages/agents/AgentTimeslots";
import AgentRatings from "../pages/agents/AgentRatings";
import CustomerList from "../pages/customers/CustomerList";
import CustomerProfile from "../pages/customers/CustomerProfile";
import CustomerAccount from "../pages/customers/CustomerAccount";
import CustomerAddress from "../pages/customers/CustomerAddress";
import CustomerPreferences from "../pages/customers/CustomerPreferences";
import CustomerGiftCards from "../pages/customers/CustomerGiftCards";
import CustomerTransactions from "../pages/customers/CustomerTransactions";
import CustomerCards from "../pages/customers/CustomerCards";
import CustomerOrders from "../pages/customers/CustomerOrders";
import CustomerReviews from "../pages/customers/CustomerReviews";
import CustomerSettings from "../pages/customers/CustomerSettings";
import Activity from "../pages/activities/Activity";
import MCreditlist from "../pages/activities/mCredit/MCreditlist";
import MCreditDetail from "../pages/activities/mCredit/MCreditDetail";
import Discountlist from "../pages/activities/discounts/DiscountList";
import DiscountDetail from "../pages/activities/discounts/DiscountDetail";
import ReferralList from "../pages/activities/referrals/ReferralList";
import Banners from "../pages/activities/banners/Banners";
import ReferralDetail from "../pages/activities/referrals/ReferralDetail";
import GiftCards from "../pages/activities/giftCards/GiftCards";
import GiftCardDetail from "../pages/activities/giftCards/GiftCardDetail";
import BannerDetail from "../pages/activities/banners/BannerDetail";
import ActivityOrders from "../pages/activities/orders/Orders";
import OrderDetail from "../pages/activities/orders/OrderDetail";
import Reports from "../pages/reports/Reports";
import AgentTransactions from "../pages/reports/AgentTransactions";
import ReportCustomerTransactions from "../pages/reports/CustomerTransactions";
import ReferralTransactions from "../pages/reports/ReferralTransactions";
import DiscountTransactions from "../pages/reports/DiscountTransactions";
import ActivityLog from "../pages/reports/ActivityLog";
import MCreditTransactions from "../pages/reports/MCreditTransactions";
import Logistics from "../pages/Logistics/Logistics";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";
import CustomerOrder from "../pages/customers/CustomerOrder";
import CustomerOrderStatus from "../pages/customers/CustomerOrderStatus";
import OrderStatus from "../pages/customers/OrderStatus";
import UpdatePayment from "../pages/customers/UpdatePayment";
import ActivitiesDriverList from "../pages/activities/drivers/DriverList";
import ActivitiesDriverDetails from "../pages/activities/drivers/DriverDetail";
import OrderPaymentStatus from "../pages/activities/orders/OrderPaymentStatus";
import AgentPayIn from "../pages/activities/payInPayOut/AgentPayIn";
import AgentPayOut from "../pages/activities/payInPayOut/AgentPayOut";
import Chats from "../pages/Chats/Chats";
import PaymentTransactions from "../pages/reports/PaymentTransactions";
import Profile from "../pages/Profile/Profile";
import Stats from "../pages/reports/stats";
import OverallTransactions from "../pages/reports/overallTransactions";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        <Route path='profile' element={<Profile/>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="userRoles" element={<UserRoles />} />
        <Route path="userRoles/:roleId" element={<UserRoleDetail />} />
        <Route path="adminUsers" element={<AdminUserList />} />
        <Route path="adminUsers/:userId" element={<AdminUserDetail />} />
        <Route path="currency" element={<CurrencyList />} />
        <Route path="currency/:currencyId" element={<CurrencyDetail />} />
        <Route path="country" element={<CountryList />} />
        <Route path="country/:countryId" element={<CountryDetail />} />
        <Route path="state" element={<StateList />} />
        <Route path="state/:stateId" element={<StateDetail />} />
        <Route path="city" element={<CityList />} />
        <Route path="city/:cityId" element={<CityDetail />} />
        <Route path="area" element={<AreaList />} />
        <Route path="area/:areaId" element={<AreaDetail />} />
        <Route path="service" element={<ServiceList />} />
        <Route path="service/:serviceId" element={<ServiceDetail />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="category/:categoryId" element={<CategoryDetail />} />
        <Route path="item" element={<ItemList />} />
        <Route path="item/:itemId" element={<ItemDetail />} />
        <Route path="settings/companyInfo" element={<CompanyInfo />} />
        <Route path="settings/app" element={<AppSettings />} />
        <Route path="settings/rate" element={<RateSettings />} />
        <Route path="settings/cancellation" element={<Cancellations />} />
        <Route path="settings/tax" element={<TaxList />} />
        <Route path="settings/tax/:taxId" element={<TaxDetail />} />
        <Route path="settings/tax/create" element={<TaxDetail />} />
        <Route path="settings/currencyRates" element={<CurrencyRates />} />
        <Route path="agent/list" element={<AgentList />} />
        <Route path="agent/:agentId/profile" element={<AgentProfile />} />
        <Route
          path="agent/:agentId/locationCharges"
          element={<LocationCharges />}
        />
        <Route path="agent/:agentId/users" element={<AgentUsers />} />
        <Route
          path="agent/user/:agentId/:userId"
          element={<AgentUserDetail />}
        />
        <Route path="agent/:agentId" element={<AgentUpdate />} />
        <Route path="agent/:agentId/wallet" element={<AgentWallet />} />
        <Route path="agent/:agentId/stats" element={<AgentStatistics />} />
        <Route path="agent/:agentId/orders" element={<AgentOrders />} />
        <Route path="agent/:agentId/items" element={<AgentItems />} />
        <Route
          path="agent/:agentId/subscriptions"
          element={<AgentSubscriptions />}
        />
        <Route path="agent/:agentId/timeslots" element={<AgentTimeslots />} />
        <Route path="agent/:agentId/ratings" element={<AgentRatings />} />
        <Route path="customer/list" element={<CustomerList />} />
        <Route
          path="customer/profile/:customerId"
          element={<CustomerProfile />}
        />
        <Route
          path="customer/account/:customerId"
          element={<CustomerAccount />}
        />
        <Route
          path="customer/addresses/:customerId"
          element={<CustomerAddress />}
        />
        <Route
          path="customer/preferences/:customerId"
          element={<CustomerPreferences />}
        />
        <Route
          path="customer/giftCards/:customerId"
          element={<CustomerGiftCards />}
        />
        <Route
          path="customer/transactions/:customerId"
          element={<CustomerTransactions />}
        />
       
        <Route path="customer/cards/:customerId" element={<CustomerCards />} />
        <Route
          path="customer/orders/:customerId"
          element={<CustomerOrders />}
        />
        <Route
          path="customer/reviews/:customerId"
          element={<CustomerReviews />}
        />
        <Route
          path="customer/settings/:customerId"
          element={<CustomerSettings />}
        />
        <Route path="customer/order/:orderId" element={<CustomerOrder />} />
        <Route
          path="customer/orderStatus/:orderId"
          element={<CustomerOrderStatus />}
        />
        <Route
          path="customer/orderStatusUpdate/:orderId"
          element={<OrderStatus />}
        />
        <Route
          path="customer/orderPaymentStatus/:orderId"
          element={<OrderPaymentStatus />}
        />
        <Route
          path="updatePayment/:orderId/:companyId"
          element={<UpdatePayment />}
        />
        <Route path="activities" element={<Activity />} />
        <Route path="activities/mcreditlist" element={<MCreditlist />} />
        <Route path="activities/mcredit/" element={<MCreditDetail />} />
        <Route
          path="activities/mcredit/:packageId"
          element={<MCreditDetail />}
        />
        <Route path="activities/discounts" element={<Discountlist />} />
        <Route
          path="activities/discount/:discountId"
          element={<DiscountDetail />}
        />
        <Route path="activities/referrals" element={<ReferralList />} />
        <Route path="activities/referral/" element={<ReferralDetail />} />
        <Route
          path="activities/referral/:referralId"
          element={<ReferralDetail />}
        />
        <Route path="activities/giftCards" element={<GiftCards />} />
        <Route path="activities/giftCard" element={<GiftCardDetail />} />
        <Route
          path="activities/giftCard/:giftId"
          element={<GiftCardDetail />}
        />
        <Route path="activities/banners" element={<Banners />} />
        <Route path="activities/banner" element={<BannerDetail />} />
        <Route path="activities/banner/:bannerId" element={<BannerDetail />} />
        <Route path="activities/orders" element={<ActivityOrders />} />
        <Route path="activities/order/:orderId" element={<OrderDetail />} />
        <Route path="activities/drivers" element={<ActivitiesDriverList />} />
        <Route
          path="activities/driver/:driverId"
          element={<ActivitiesDriverDetails />}
        />
        <Route
          path="activities/agentPayIn/:driverId"
          element={<AgentPayIn />}
        />
        <Route path="activities/agentPayOut/" element={<AgentPayOut />} />
        <Route path="reports" element={<Reports />} />
        <Route path="/chats" element={<Chats />} />
        <Route
          path="reports/agentTransactions"
          element={<AgentTransactions />}
        />
        <Route
          path="reports/customerTransactions"
          element={<ReportCustomerTransactions />}
        />
        <Route
          path="reports/referralTransactions"
          element={<ReferralTransactions />}
        />
        <Route
          path="reports/discountTransactions"
          element={<DiscountTransactions />}
        /> 
        <Route
        path="reports/stats"
        element={<Stats/>}
      /> 
      <Route
      path="/reports/overallTransactions"
      element={<OverallTransactions />}
    />
        <Route path="reports/activityLog" element={<ActivityLog />} />
        <Route
          path="reports/mcreditsTransactions"
          element={<MCreditTransactions />}
        />
        <Route
          path="reports/paymentTransactions"
          element={<PaymentTransactions />}
        />
        <Route path="logistcs" element={<Logistics />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
