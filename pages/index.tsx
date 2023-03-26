import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let trendingResults: {
    tweetText: string;
    tweets: number;
    trendingText: string;
  }[] = [];
  let followResults: {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  }[] = [];

  try {
    trendingResults = [
      { trendingText: "Trending", tweetText: "LinkedIn", tweets: 23000 },
      {
        trendingText: "Technology - Trending",
        tweetText: "TypeScript",
        tweets: 13000,
      },
      {
        trendingText: "Politics - Trending",
        tweetText: "Taliban",
        tweets: 5400,
      },
      {
        trendingText: "Culture - Trending",
        tweetText: "New Year Eve",
        tweets: 900,
      },
      {
        trendingText: "Sport - trending",
        tweetText: "Qatar",
        tweets: 2300034,
      },
    ];

    // without www. fetch failed;Hostname/IP does not match certificate's altnames
    const fetchedData: {
      data: {
        id: string;
        title: string;
        firstName: string;
        lastName: string;
        picture: string;
      }[];
      total: number;
      page: number;
      limit: number;
    } = await fetch(
      process.env.NEXT_PUBLIC_DUMMYAPI_BASE_URL + "user?limit=20",
      {
        method: "GET",
        headers: { "app-id": process.env.DUMMYAPI_TOKEN as string },
      }
    ).then((res) => res.json());

    followResults = fetchedData.data;
  } catch (error) {
    if (error instanceof Error) console.log("error is", error.message);
  }

  // getProviders calls /api/auth/providers and returns a list of the currently configured authentication providers. It can be useful if you are creating a dynamic custom sign in page.
  const providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null = await getProviders();
  const session: changedSessionType | null = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
    // retrieve session server-side; to avoid browser from showing it for 1sec
    // `session` comes from `getServerSideProps`.
    // Avoids flickering/session loading on first load.
  };
};

export default Home;
