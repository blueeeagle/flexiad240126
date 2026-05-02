type MastersPermissions = {
  main: string[];                   
  permissions: Record<string, string[]>;  
  subMenu: Record<string, string[]>;     
};

type AdminPermissions = {
  main: string[];                   
  permissions: Record<string, string[]>;  
  subMenu: Record<string, string[]>;  
};

export const getPermissionsByLabel = (label: string) => {
  try {
    const raw = localStorage.getItem("permissions");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const normalizedTarget = label.trim().toLowerCase();

    // Look through each top‑level object (e.g., company/user record)
    for (const item of parsed) {
      // If the object has a direct 'permissions' array, search inside it
      if (Array.isArray(item.permissions)) {
        const found = item.permissions.find((perm: any) => {
          const permLabel = perm?.label?.trim().toLowerCase();
          return permLabel === normalizedTarget;
        });
        if (found) {
          console.log(`✅ Permissions for ${label}:`, found);
          return found;
        }
      }
      // Also support the case where the item itself is the permission object (fallback)
      if (item?.label?.trim().toLowerCase() === normalizedTarget) {
        console.log(`✅ Permissions for ${label} (direct):`, item);
        return item;
      }
    }

    console.warn(`❌ Label "${label}" not found in any permissions array.`);
    return null;
  } catch (err) {
    console.error("Error parsing permissions:", err);
    return null;
  }
};

export const getAdminPermissions = (): AdminPermissions => {
  const adminPerms = getPermissionsByLabel("Admin");
  if (!adminPerms) {
    return { main: [], permissions: {}, subMenu: {} };
  }

  // main: prefer explicit adminPerms.main, else use keys of permissions object
  const main = Array.isArray(adminPerms.main)
    ? adminPerms.main
    : Object.keys(adminPerms.permissions || {});

  const permissionsObj =
    adminPerms.permissions && typeof adminPerms.permissions === "object"
      ? adminPerms.permissions
      : {};

  const subMenu: Record<string, string[]> = {};
  if (Array.isArray(adminPerms.subMenu)) {
    adminPerms.subMenu.forEach((item: any) => {
      if (item?.label && Array.isArray(item.permissions)) {
        subMenu[item.label] = item.permissions;
      }
    });
  }

  return { main, permissions: permissionsObj, subMenu };
};

export const getMastersPermissions = (): MastersPermissions => {
  const adminPerms = getPermissionsByLabel("Masters");
  if (!adminPerms) {
    return { main: [], permissions: {}, subMenu: {} };
  }

  const main = Array.isArray(adminPerms.main)
    ? adminPerms.main
    : Object.keys(adminPerms.permissions || {});

  const permissionsObj =
    adminPerms.permissions && typeof adminPerms.permissions === "object"
      ? adminPerms.permissions
      : {};

  const subMenu: Record<string, string[]> = {};
  if (Array.isArray(adminPerms.subMenu)) {
    adminPerms.subMenu.forEach((item: any) => {
      if (item?.label && Array.isArray(item.permissions)) {
        subMenu[item.label] = item.permissions;
      }
    });
  }

  return { main, permissions: permissionsObj, subMenu };
};

// Other functions remain the same (they expect array permissions)
export const getDashboardPermissions = (): string[] => {
  const perms = getPermissionsByLabel("Dashboard");
  return perms?.permissions || [];
};

export const getSettingsPermissions = (): string[] => {
  const perms = getPermissionsByLabel("Settings");
  console.log("Raw perms:", perms);        // what does this log?
  console.log("Permissions array:", perms?.permissions);
  return perms?.permissions || [];
};

export const getOrdersPermissions = (): string[] => {
  const perms = getPermissionsByLabel("Orders");
  return perms?.permissions || [];
};

export const getUsersPermissions = (): string[] => {
  const perms = getPermissionsByLabel("Users");
  return perms?.permissions || [];
};

export const getActivitiesPermissions = (): string[] => {
  // Keep the label as stored ("Activites" typo)
  const perms = getPermissionsByLabel("Activites");
  return perms?.permissions || [];
};

export const getReportsPermissions = (): string[] => {
  const perms = getPermissionsByLabel("Reports");
  return perms?.permissions || [];
};