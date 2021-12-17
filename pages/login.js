import styles from "../styles/Login.module.css";
import Layout from "../components/Layout";

const LoginPage = () => {
  const { login, formContainer } = styles;
  return (
    <Layout>
      <div className={login}>
        <h3 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
          Sign In
        </h3>
        <div className={formContainer}>
          <form>
            <div>
              <h5>username</h5>
              <input
                type="text"
                maxLength="32"
                minLength="4"
                id="username-input"
              />
            </div>
            <div>
              <h5>Password</h5>
              <input
                type="text"
                maxLength="32"
                minLength="4"
                id="username-password"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
