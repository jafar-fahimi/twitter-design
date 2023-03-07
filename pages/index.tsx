import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getProviders, getSession, useSession } from "next-auth/react";
import { AppContextType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React, { ContextType } from "react";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";

export default function Home({
  trendingResults,
  followResults,
  providers,
  session: mySession,
}: any) {

  const { data: session } = useSession();
  if (!session) return <Login providers={providers} />;
  
  return (
    <main>
      <Head>
        <title>Twitter Design</title>
        <link rel="icon" href="twitter.svg" />
      </Head>
      <section className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />} */}
      </section>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  // getProviders calls /api/auth/providers and returns a list of the currently configured authentication providers. It can be useful if you are creating a dynamic custom sign in page.
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
