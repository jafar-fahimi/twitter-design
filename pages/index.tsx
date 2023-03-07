import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getProviders, getSession } from "next-auth/react";
import { AppContextType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import React, { ContextType } from "react";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";

export default function Home({
  trendingResults,
  followResults,
  providers,
  session,
}: any) {
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
