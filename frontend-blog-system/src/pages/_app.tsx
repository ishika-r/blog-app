import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
