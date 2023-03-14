import { GetServerSidePropsContext, NextPage } from "next";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  getSession,
  useSession,
} from "next-auth/react";
import React from "react";
import { useRecoilState } from "recoil";
import { commentModalState } from "../atoms/atoms";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/CommentModal";
import Sidebar from "../components/Sidebar";
import { changedSessionType } from "../utils/typings";
import Widgets from "../components/Widgets";
import { Session } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";
import { Provider } from "next-auth/providers";

type Props = {
  trendingResults: [];
  followResults: [];
  providers: Provider;
  session: Session;
};
const Home: NextPage<Props> = ({
  trendingResults,
  followResults,
  providers,
  session: mySession,
}) => {
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
      <section className="mx-auto flex min-h-screen max-w-[1500px] bg-black">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {commentIsOpen && <Modal />}
      </section>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let trendingResults = [];
  let followResults = [];
  try {
    trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(
      (data) => data.json()
    );
    // without www. fetch failed;Hostname/IP does not match certificate's altnames
    followResults = await fetch("https://www.jsonkeeper.com/b/WWMJ").then(
      (res) => res.json()
    );
  } catch (error) {
    if (error instanceof Error) console.log("error is", error.message);
  }

  // getProviders calls /api/auth/providers and returns a list of the currently configured authentication providers. It can be useful if you are creating a dynamic custom sign in page.
  const providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null = await getProviders();
  const session: Session | null = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session, // retrieve session server-side; to avoid browser from showing it for 1sec
    },
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
  };
}

export default Home;
