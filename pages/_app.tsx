import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title> Twitter Design</title>
        <link rel="icon" href="twitter.svg" />
      </Head>
      // `session` comes from `getServerSideProps` or `getInitialProps`. //
      Avoids flickering/session loading on first load.
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
};

export default App;
