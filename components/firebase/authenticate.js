import { createContext, useContext } from "react";
import { useState, useEffect } from "react/cjs/react.development";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./initialize";
import { url } from "../../url";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthenticationProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setUser(null);
      await fetch(`${url}/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  // If user logged in on front end send token to back end.
  const checkUser = async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const idToken = await user.getIdToken(/* forceRefresh */ true);
          const res = await fetch(`${url}/api/login`, {
            method: "POST",
            withCredentials: true,
            credentials: "include",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          });
          if (res.ok) {
            const data = await res.json();
            setLoggedIn(data.success);
            console.log();
          } else {
            console.log(res.status);
            setLoggedIn(false);
            setUser(null);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    checkUser();
    return () => {
      setLoggedIn(false);
      setUser(null);
    };
  }, []);

  const data = {
    registerUser,
    loginUser,
    forgotPassword,
    logOut,
    loggedIn,
    user,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
