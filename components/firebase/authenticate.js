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
  const [user, setUser] = useState("");

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
      setUser(user);
    });
  };

  useEffect(() => {
    checkUser();
    return () => {
      setUser("");
    };
  }, []);

  const data = {
    user,
    registerUser,
    loginUser,
    forgotPassword,
    logOut,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
