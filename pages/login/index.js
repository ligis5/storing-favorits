import styles from "../../styles/Login.module.css";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useAuth } from "../../components/firebase/authenticate";

const LoginPage = () => {
  const { login, formContainer } = styles;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");
  const [visible, setVisible] = useState("none");

  const { loginUser } = useAuth();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      setVisible("none");
      setEmail("");
      setPassword("");
    } catch (error) {
      setText("Wrong email or password");
      setVisible("flex");
    }
  };

  return (
    <Layout>
      <div className={login}>
        <h3 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
          Sign In
        </h3>
        <div className={formContainer}>
          <form onSubmit={submitLogin}>
            <div>
              <h5>email</h5>
              <h6 style={{ display: visible }}>{text}</h6>
              <input
                required
                type="email"
                maxLength="64"
                minLength="4"
                id="username-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <h5>Password</h5>
              <input
                required
                type="password"
                maxLength="32"
                minLength="4"
                id="username-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">submit</button>
          </form>
          <button>Forgot password</button>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
