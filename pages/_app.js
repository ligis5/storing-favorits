import "../styles/globals.css";
import AuthenticationProvider from "../components/firebase/authenticate";
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
import DataProvider from "../components/getData";
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }) {
  return (
    <AuthenticationProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthenticationProvider>
  );
}

export default MyApp;
