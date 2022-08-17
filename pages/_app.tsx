import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import store from "../app/store";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={3000}
        placement="top-right"
      >
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
      </ToastProvider>
    </Provider>
  );
}

export default MyApp;
