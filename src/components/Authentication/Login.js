import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Login = () => {
  const { authenticate, isAuthenticating, authError, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    enableWeb3();
  }, [enableWeb3]);

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
