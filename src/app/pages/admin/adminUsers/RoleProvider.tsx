import { useEffect, useState, ReactNode } from "react";

interface Role {
  _id: string;
  roleName: string;
  permissions: any[];
  created_by: string;
}

interface Props {
  token: string;
  isEditMode?: boolean;
  children: ReactNode;
}

const RoleProvider = ({ token, isEditMode = false, children }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchRoles = async () => {
    try {
      const res = await fetch(
        "https://adminapi.flexiclean.me/api/v1/admin/roles",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      const rolesList: Role[] = data.data || [];

      setRoles(rolesList);

      if (!isEditMode && rolesList.length > 0) {
        const adminRole = rolesList.find(
          (r) => r.roleName === "Admin"
        );
        const defaultRole = adminRole || rolesList[0];

        // ✅ Store permissions globally
        localStorage.setItem(
          "permissions",
          JSON.stringify(defaultRole.permissions || [])
        );

        localStorage.setItem("roleId", defaultRole._id);
      }
    } catch (err) {
      console.error("Roles fetch error", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRoles();
    }
  }, [token]);

  return <>{children}</>;
};

export default RoleProvider;