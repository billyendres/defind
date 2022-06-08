import React from "react";
import { useMoralis } from "react-moralis";

const Login = () => {
  const {
    authenticate,
    isAuthenticating,
    isAuthenticated,
    authError,
    logout,
    user,
  } = useMoralis();

  if (isAuthenticated) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1>Welcome {user.attributes.username}</h1>
        <button onClick={() => logout()}>
          <h1 style={{ fontSize: "2rem", padding: "0.75rem 1rem" }}>Logout</h1>
        </button>
      </div>
    );
  }
  return (
    <div>
      {isAuthenticating && <p>Authenticating</p>}
      {authError && <p>{JSON.stringify(authError.message)}</p>}
      <button onClick={() => authenticate()}>
        <h1 style={{ fontSize: "2rem", padding: "0.75rem 1rem" }}>Login</h1>
      </button>
    </div>
  );
};

export default Login;
