import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../app/store";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex flex-col justify-between min-h-screen">
        <Head>
          <title>MERN eCommerce</title>
        </Head>
        <div>
          <Header />
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default MyApp;
