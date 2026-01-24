
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const userString = localStorage.getItem("kt-auth-react-v");

  if (!userString) {
    return <div className="alert alert-danger text-center">No user data found</div>;
  }

  try {
    const users = JSON.parse(userString);
    const user = users.data.userDetails;

    return (
      <div className="container mt-5 d-flex justify-content-center">
        <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body text-center">
            <h3 className="card-title text-primary">Profile</h3>
            <hr />
            <p className="fw-bold">Name: <span className="text-muted">{user.name}</span></p>
            <p className="fw-bold">Email: <span className="text-muted">{user.email}</span></p>
            <p className="fw-bold">Mobile: <span className="text-muted">{user.mobile}</span></p>
            <p className="fw-bold">User Type: <span className="badge bg-success">{user.userType}</span></p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error parsing user data:", error);
    return <div className="alert alert-danger text-center">Invalid user data</div>;
  }
};

export default Profile;
