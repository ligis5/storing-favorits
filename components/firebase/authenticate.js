import { Children, createContext, useContext } from "react";
import { useState } from "react/cjs/react.development";
import { auth, createUserWithPass } from "./initialize";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState("hello");

  const registerUsingPassword = (email, password) => {
    createUserWithPass(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(
          "error Code:" + " " + errorCode,
          "error Message:" + " " + errorMessage
        );
      });
  };

  const data = {
    user,
    registerUsingPassword,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthenticationProvider;
