import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/User.Context";

export default function ProtectRouter({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    return children;
  } else {
    return <Navigate to="/Auth/Login" />;
  }
}
