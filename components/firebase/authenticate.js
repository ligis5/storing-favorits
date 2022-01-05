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

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState("");

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    return signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // check if user is already logged in
  const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            setToken(idToken);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else setToken(null);
    });
  };

  const getUserToken = () => {};

  useEffect(() => {
    checkUser();
    return () => {
      setToken(null);
    };
  }, []);

  const data = {
    registerUser,
    loginUser,
    forgotPassword,
    logOut,
    token,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
