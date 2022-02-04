import React, { useEffect } from "react";
import { AuthProvider } from "@arcana/auth";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/arcana-logo.svg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const authInstance = new AuthProvider({
    appID: "475",
    network: "testnet",
    flow: "popup",
    oauthCreds: [
      {
        type: "google",
        clientId:
          "689091030179-42galv66eend7jf92u91vubao2550r8h.apps.googleusercontent.com",
      },
    ],
    // redirectUri: `${window.location.origin}/login/redirect`,
  });

  async function loginUser() {
    await authInstance.loginWithSocial("google");
    const info = authInstance.getUserInfo();
    navigate("files", { state: info });
  }

  useEffect(() => {
    const isLoggedIn = authInstance.isLoggedIn();
    if (isLoggedIn) {
      navigate("files");
    }
  }, []);

  useEffect(() => {
    const { hash } = location;
    if (hash.startsWith("#state")) {
      AuthProvider.handleRedirectPage(window.location);
    }
  }, [location]);

  return (
    <div className="bg-black h-full text-white flex flex-col justify-center items-center">
      <img src={logo} alt="logo" className="mb-5" />
      <button
        onClick={loginUser}
        className="border-2 border-white rounded p-2 px-5 bg-white text-black"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
