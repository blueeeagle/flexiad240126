import { useIntl } from "react-intl";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title="DASHBOARD"
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItemWithSub
        to=""
        icon="switch"
        title="ADMIN"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/userRoles"
          title="User Roles"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem
          to="/adminUsers"
          title="Admin User"
          fontIcon="bi-layers"
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to=""
        icon="switch"
        title="MASTERS"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/currency"
          title="Currencies"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem to="/country" title="Country" fontIcon="bi-layers" />
        <SidebarMenuItem
          to="/state"
          title="State / Provinces"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem to="/city" title="City" fontIcon="bi-layers" />
        <SidebarMenuItem to="/area" title="Area" fontIcon="bi-layers" />
        <SidebarMenuItem to="/service" title="Service" fontIcon="bi-layers" />
        <SidebarMenuItem to="/category" title="Category" fontIcon="bi-layers" />
        <SidebarMenuItem to="/item" title="Items" fontIcon="bi-layers" />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to=""
        icon="gear"
        title="SETTINGS"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/settings/companyInfo"
          title="Company"
          fontIcon="bi-layers"
        />
        {/* <SidebarMenuItem
          to="/settings/app"
          title="App Settings"
          fontIcon="bi-layers"
        /> */}
        <SidebarMenuItem
          to="/settings/rate"
          title="Rate Settings"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem
          to="/settings/cancellation"
          title="Cancellations"
          fontIcon="bi-layers"
        />
        <SidebarMenuItem to="settings/tax" title="Tax" fontIcon="bi-layers" />
        {/* <SidebarMenuItem
          to="/settings/currencyRates"
          title="Currency Rates"
          fontIcon="bi-layers"
        /> */}
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub
        to=""
        icon="gear"
        title="USERS"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem to="/agent/list" title="Agency" fontIcon="bi-layers" />
        <SidebarMenuItem
          to="/customer/list"
          title="Customers"
          fontIcon="bi-layers"
        />
      </SidebarMenuItemWithSub>

      <SidebarMenuItem
        to="/activities"
        icon="element-11"
        title="ACTIVITIES"
        fontIcon="bi-app-indicator"
      />

      <SidebarMenuItem
        to="/reports"
        icon="element-11"
        title="REPORTS"
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/logistcs"
        icon="bi bi-layers"
        title="LOGISTICS"
        fontIcon="bi bi-layers"
      />
      <SidebarMenuItem
        to="/chats"
        icon="bi bi-chat"
        title="CHATS"
        fontIcon="bi bi-chat"
      />
    </>
  );
};

export { SidebarMenuMain };
