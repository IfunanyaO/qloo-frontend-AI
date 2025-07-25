import React from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthLayout } from "@/components/layout/auth-layout";
import GoogleMapPageComponent from "@/pages/google-map/GoogleMapPageComponent";

const LoginPage = React.lazy(() =>
  import("@/features/auth").then((module) => ({
    default: module.LoginPage,
  }))
);

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="map" element={<GoogleMapPageComponent />} /> */}
      </Route>
    </>
  );
};
