import '../resources/styles/styles.scss'
import '../resources/styles/timeline-utils.sass'
import type {AppContext, AppProps} from 'next/app'
import Head from "next/head";
import {PageDataProvider} from "../components/core/PageDataProvider";
import {initStore, wrapper} from "../redux/store";
import {Provider} from "react-redux";

const store = initStore()

function MyApp({ Component, pageProps}: AppProps) {
  return (
    <PageDataProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

        {/*
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    */}
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </PageDataProvider>
  );
}

export default MyApp
