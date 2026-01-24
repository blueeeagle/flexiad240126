import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

// Define the user interface
interface User {
  _id: string; // Assuming _id is a string
  firstName?: string;
  lastName?: string;
  name?: string;
  mobile?: string;
  email?: string;
  created_at?: any;

  userType?: "customer" | "agent";
}

// Define props with recentCustomers and recentAgents
interface RegisterListProps {
  data: {
    recentCustomers: User[];
    recentAgents: User[];
  } | null;
}

// Functional component
const RegisterList: FC<RegisterListProps> = ({ data }) => {
 
 
  const navigate = useNavigate();


  const handleuserid = (id: string, userType: "customer" | "agent"|undefined) => {
console.log(userType);

    if  (userType === "agent") {
      navigate(`/agent/${id}`);
    } else  {
      navigate(`/customer/profile/${id}`);
    }
  };

  const renderTable = (title: string, users: User[]) => (
    <div style={{ marginBottom: "1rem", padding: "0.5rem", borderRadius: "4px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#333" }}>{title}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Date</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Name</th>
            <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Mobile</th>
            {users.some((user) => user.userType === "agent") && (
              <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Email</th>
            )}
            <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                <td style={{ padding: "10px" }} >{new Date(user.created_at).toLocaleDateString("en-GB")}</td>
                <td style={{ padding: "10px" }}>
                  {user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "N/A"}
                </td>
                <td style={{ padding: "10px" }}>{user.mobile || "N/A"}</td>
                {user.userType === "agent" && (
                  <td style={{ padding: "10px" }}>{user.email || "N/A"}</td>
                )}
                <td>
                  <button style={{ backgroundColor: "blue", color: "white", border:'none' }} onClick={() => handleuserid(user._id, user.userType)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: "10px" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center", padding: "2rem",margin:"2rem" }}>
      {renderTable("Recent Customers", data?.recentCustomers || [])}
      {renderTable("Recent Agents", data?.recentAgents || [])}
    </div>
  );
};

export default RegisterList;
