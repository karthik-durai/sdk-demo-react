import React, { useEffect } from 'react'
import { AuthProvider } from "@arcana/auth";

function Login() {
    const authInstance = new AuthProvider({
        appID: '475',
        network: "testnet",
        oauthCreds: [
          {
            type: "google",
            clientId: '689091030179-42galv66eend7jf92u91vubao2550r8h.apps.googleusercontent.com',
          },
        ],
        redirectUri: `${window.location.origin}/auth/redirect`,
      });

      async function loginUser() {
        await authInstance.loginWithSocial("google");
      }

      useEffect(() => {
          console.log(authInstance, 'authInstance')
          const isLoggedIn = authInstance.isLoggedIn();
          if(!isLoggedIn) {
            // loginUser()
          }
      }, [])

    return <div>
        <button>Login</button>
    </div>
}

export default Login