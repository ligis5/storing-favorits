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
  const [text, setText] = useState("");
  const [visible, setVisible] = useState("none");

  const { registerUser } = useAuth();

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (password != repeatPassword) {
      setText("Passwords don't match");
      setVisible("flex");
    }
    if (password === repeatPassword) {
      try {
        await registerUser(email, password);
        setVisible("none");
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          setText("This email is already registered, use different email");
          setVisible("flex");
        } else {
          setText("Sorry an error has occurred please try again");
          setVisible("flex");
        }
      }
    }
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
                maxLength="64"
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
              <h6 style={{ display: visible }}>{text}</h6>
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
              <h6 style={{ display: visible }}>{text}</h6>
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
