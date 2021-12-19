import styles from "../styles/Register.module.css";
import Layout from "../components/Layout";
import { useState } from "react";
import { useAuth } from "../components/firebase/authenticate";

const RegisterPage = () => {
  const { register, formContainer } = styles;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const { registerUsingPassword } = useAuth();

  const submitRegistration = (e) => {
    if (password === repeatPassword) {
      registerUsingPassword(email, password);
    } else {
      console.log("passwords don't match");
    }

    e.preventDefault();
  };

  return (
    <Layout>
      <div className={register}>
        <h3 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
          Create Account
        </h3>
        <div className={formContainer}>
          <form onSubmit={submitRegistration}>
            <div>
              <h5>username</h5>
              <input
                required
                type="text"
                maxLength="32"
                minLength="4"
                id="username-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <h5>email</h5>
              <input
                required
                type="email"
                id="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <h5>Password</h5>
              <input
                required
                type="password"
                maxLength="64"
                minLength="8"
                id="username-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <h5>Repeat Password</h5>
              <input
                required
                type="password"
                maxLength="64"
                minLength="8"
                id="username-password-repeat"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <button type="submit">Confirm</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default RegisterPage;
