import "../styles/globals.css";
import AuthenticationProvider from "../components/firebase/authenticate";

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <Component {...pageProps} />
    </AuthenticationProvider>
  );
}

export default MyApp;
