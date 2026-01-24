// import * as React from 'react';
// import { useLocation } from 'react-router-dom';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';

// export interface IBreadCrumbsProps {}

// export function BreadCrumbs(props: IBreadCrumbsProps) {
//   const location = useLocation();

//   // Get query parameters from the URL
//   const searchParams = new URLSearchParams(location.search);

//   // Extract the company name from the query parameter
//   const companyName = searchParams.get('company');

//   // Split the pathname and filter out any empty strings
//   const crumb = location.pathname
//     .split('/')
//     .filter((crumb) => crumb !== '');

//   return (
//     <Breadcrumb style={{ padding: '10px 20px' }}>
//       <Breadcrumb.Item href="dashboard" style={{ padding: '0 10px' }}>
//         Home
//       </Breadcrumb.Item>
//       <Breadcrumb.Item href={`/${crumb[0]}`} style={{ padding: '0 10px' }}>
//         {`${crumb[0]}`}
//       </Breadcrumb.Item>
//       <Breadcrumb.Item active style={{ padding: '0 10px' }}>
//         {/* Display the company name from query parameter if it exists */}
//         {companyName ? companyName : crumb[1] && crumb[1].includes('-') ? crumb[1].split('-').slice(1).join('-') : crumb[1]}
//       </Breadcrumb.Item>
//     </Breadcrumb>
//   );
// }
import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export interface IBreadCrumbsProps {}

export function BreadCrumbs(props: IBreadCrumbsProps) {
  const location = useLocation();

  // Extract query parameters from the URL
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("company"); // Get the company name

  // Split the pathname into segments, ignoring empty strings
  const crumbs = location.pathname.split("/").filter((crumb) => crumb);

  return (
    <Breadcrumb style={{ padding: "10px 20px" }}>
      {/* Home Breadcrumb */}
      <Breadcrumb.Item style={{ padding: "0 10px" }}>
        <Link to="/dashboard">Home</Link>
      </Breadcrumb.Item>

      {/* First-level Breadcrumb */}
      {crumbs[0] && (
        <Breadcrumb.Item style={{ padding: "0 10px" }}>
          <Link to={`/${crumbs[0]}`}>{crumbs[0]}</Link>
        </Breadcrumb.Item>
      )}

      {/* Active (last) Breadcrumb */}
      <Breadcrumb.Item active style={{ padding: "0 10px" }}>
        {companyName
          ? companyName
          : crumbs[1]
          ? crumbs[1].includes("-")
            ? crumbs[1].split("-").slice(1).join("-") // Extract after '-' if applicable
            : crumbs[1]
          : "Details"}{" "}
        {/* Fallback text */}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
}
