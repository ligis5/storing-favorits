import { createContext, useContext } from "react";
import { useState } from "react/cjs/react.development";
import {
  auth,
  createUserWithPass,
  loginWithPass,
  forgotPass,
} from "./initialize";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const registerUser = (email, password) => {
    return createUserWithPass(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
    });
  };
  const loginUser = (email, password) => {
    return loginWithPass(auth, email, password).then((userCredential) => {
      setUser(userCredential.user);
    });
  };

  const forgotPassword = (email) => {
    return forgotPass(auth, email);
  };

  const data = {
    user,
    registerUser,
    loginUser,
    forgotPassword,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
