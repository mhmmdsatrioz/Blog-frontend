// STYLE
import "../styles/globals.css";
import "../styles/Login.css";
import "../styles/Register.scss";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import 'semantic-ui-css/semantic.min.css'
import { QueryClient, QueryClientProvider } from "react-query";

import store from "./Redux-store/store";
import { Provider } from "react-redux";
import LoadingScreen from "./Screen/LoadingScreen";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const client =  new QueryClient();


  React.useEffect(() => {
    const handleStart = (url:any) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url:any) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <>
        {loading ? <LoadingScreen loading={loading} />
          : <Component {...pageProps} />
        }
        </>
        </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
