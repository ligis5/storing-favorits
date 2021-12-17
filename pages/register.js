import styles from "../styles/Register.module.css";
import Layout from "../components/Layout";

const RegisterPage = () => {
  const { register, formContainer } = styles;
  return (
    <Layout>
      <div className={register}>
        <h3 style={{ margin: "0", alignSelf: "center", justifySelf: "center" }}>
          Create Account
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
            <div>
              <h5>Repeat Password</h5>
              <input
                type="text"
                maxLength="32"
                minLength="4"
                id="username-password-repeat"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default RegisterPage;
