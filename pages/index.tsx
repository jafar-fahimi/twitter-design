import { GetServerSidePropsContext, NextPage } from "next";
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import React, { FunctionComponent } from "react";
import { useRecoilState } from "recoil";
import { commentModalState } from "../atoms/atoms";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/CommentModal";
import Sidebar from "../components/Sidebar";
import { changedSessionType } from "../utils/typings";

// export default function Home({
const Home: NextPage = ({
  trendingResults,
  followResults,
  providers,
  session: mySession,
}: any) => {
  const {
    data: session,
    status,
  }: {
    data: null | changedSessionType;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const [commentIsOpen, setCommentIsOpen] = useRecoilState(commentModalState);
  if (!session) return <Login providers={providers} />;

  return (
    <main>
      <Head>
        <title> Twitter Design</title>
        <link rel="icon" href="twitter.svg" />
      </Head>
      <section className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        {/* <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
          />*/}
        {commentIsOpen && <Modal />}
      </section>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
    (data) => data.json()
  );
  // without www. fetch failed;Hostname/IP does not match certificate's altnames
  const followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
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
      session, // retrieve session server-side; to avoid browser from showing it for 1sec
    },
  };
}

export default Home;
