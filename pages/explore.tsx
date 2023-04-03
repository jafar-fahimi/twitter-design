import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Modal from "../components/CommentModal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Head from "next/head";
import Login from "../components/Login";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { commentModalState } from "../atoms/atoms";
import { db } from "../utils/firebase";
import Comment from "../components/Comment";
import { changedSessionType } from "../utils/typings";
import Trending from "../components/Trending";
import { KeyIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const PostPage: NextPage<any> = ({
  trendingResults = "",
  followResults = "",
  providers,
}) => {
  const [commentIsOpen, setCommentIsOpen] = useRecoilState(commentModalState);
  const router = useRouter();
  const {
    data: session,
    status,
  }: {
    data: changedSessionType | null;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  let titleText = `${session?.user?.name} on Twitter: @${session?.user?.tag}`;
  if (session?.user?.name === undefined) titleText = "Twitter Design";

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>{titleText}</title>
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="sticky mx-4 top-0 py-1.5 bg-black z-50 w-10/12">
            <div className="flex items-center justify-between bg-[#202327] p-2 rounded-full relative">
              <MagnifyingGlassIcon className="text-gray-500 h-6 p-0 z-50" />
              <input
                type="text"
                className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
                placeholder="Search Twitter"
              />
              <KeyIcon className="h-6 text-gray-500 z-50 -mr-16" />
            </div>
          </div>

          <div className="text-[#d9d9d9] space-y-3 pt-2 rounded-xl w-full">
            <h4 className="font-bold text-xl px-4">Trends for you</h4>
            {trendingResults.map(
              (
                result: {
                  tweetText: string;
                  tweets: number;
                  trendingText: string;
                },
                index: number
              ) => (
                <Trending key={index} result={result} />
              )
            )}
            <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
              Show more
            </button>
          </div>
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {commentIsOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let trendingResults: {
    tweetText: string;
    tweets: number;
    trendingText: string;
  }[] = [];
  let followResults: {
    name: { title: string; first: string; last: string };
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
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
    const fetchedData: {
      results: [
        {
          name: { title: string; first: string; last: string };
          login: {
            uuid: string;
            username: string;
            password: string;
            salt: string;
            md5: string;
            sha1: string;
            sha256: string;
          };
          picture: {
            large: string;
            medium: string;
            thumbnail: string;
          };
        }
      ];
    } = await fetch(
      "https://randomuser.me/api/?results=30&inc=name,login,picture"
    ).then((res) => res.json());
    followResults = fetchedData.results;
  } catch (error) {
    if (error instanceof Error) console.log("error occured ", error.message);
  }

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
};
