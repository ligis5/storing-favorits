import styles from "../../styles/Login.module.css";
import Layout from "../../components/Layout";
import { useState } from "react";
import { useAuth } from "../../components/firebase/authenticate";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const { login, formContainer } = styles;
  const { forgotPassword } = useAuth();
  const [text, setText] = useState("");
  const [visible, setVisible] = useState("none");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setVisible("flex");
      setEmail("");
      setText("Request to change your password was sent to your email");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setText("Email is not regitered");
        setVisible("flex");
      } else {
        setText("Sorry an error has occurred please try again");
        setVisible("flex");
      }
    }
  };

  return (
    <Layout>
      <div className={login}>
        <h3 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
          Sign In
        </h3>
        <div className={formContainer}>
          <form onSubmit={submitForm}>
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
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassPage;
