// import { FC } from "react";
// import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
// import { PrivateRoutes } from "./PrivateRoutes";
// import { ErrorsPage } from "../modules/errors/ErrorsPage";
// import { Logout, AuthPage, useAuth } from "../modules/auth";
// import { App } from "../App";

// const { BASE_URL } = import.meta.env;

// const AppRoutes: FC = () => {
//   const { currentUser } = useAuth();
//   const token = localStorage.getItem("token");
//   return (
//     <BrowserRouter basename={BASE_URL}>
//       <Routes>
//         <Route element={<App />}>
//           <Route path="error/*" element={<ErrorsPage />} />
//           <Route path="logout" element={<Logout />} />
//           {token ? (
//             <>
//               <Route path="/*" element={<PrivateRoutes />} />
//               <Route index element={<Navigate to="/dashboard" />} />
//             </>
//           ) : (
//             <>
//               <Route path="auth/*" element={<AuthPage />} />
//               <Route path="*" element={<Navigate to="/auth" />} />
//             </>
//           )}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export { AppRoutes };
import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { ErrorsPage } from "../modules/errors/ErrorsPage";
import { Logout, AuthPage, useAuth } from "../modules/auth";
import { App } from "../App";

const { BASE_URL } = import.meta.env;

const AppRoutes: FC = () => {
  const { currentUser } = useAuth();
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter basename={BASE_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          {token ? (
            <>
              <Route path="/*" element={<PrivateRoutes />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
