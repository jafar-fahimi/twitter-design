import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";
import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Modal from "../components/CommentModal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import Post from "../components/Post";
import { ArrowLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Login from "../components/Login";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { commentModalState } from "../atoms/atoms";
import { changedSessionType } from "../utils/typings";
import { Dialog, Transition } from "@headlessui/react";
import {
  SparklesIcon,
  TvIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Communities: NextPage<any> = ({
  trendingResults = "",
  followResults = "",
  providers,
}) => {
  const [exploreModalIsOpen, setExploreModalIsOpen] = useState(true);
  const {
    data: session,
    status,
  }: {
    data: changedSessionType | null;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();
  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>Explore | Twitter</title>
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]"></div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {exploreModalIsOpen && (
          <Transition.Root show={exploreModalIsOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-30 inset-0 pt-8"
              onClose={setExploreModalIsOpen}
            >
              <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen text-center sm:block">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                </Transition.Child>
                <div className="z-30 text-white p-4 rounded-xl bg-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -ml-16 lg:w-1/3 text-left">
                  <span
                    className="cursor-pointer"
                    onClick={() => setExploreModalIsOpen(false)}
                  >
                    <XMarkIcon
                      className="bg-black hover:bg-white/10 rounded-full transition ease-linear p-1"
                      height={34}
                    />
                  </span>
                  <div className="px-12 py-4">
                    <p className="font-bold text-3xl">
                      Welcome to Twitter Communities
                    </p>
                    <p className="text-gray-500 mb-12">
                      Communites are moderated discussion groups where people on
                      Twitter can connect and share
                    </p>
                    <div className="space-y-5">
                      <div className="flex justify-between">
                        <span className="pr-4">
                          <SparklesIcon height={30} />
                        </span>
                        <div>
                          <p className="font-bold">
                            Meet others with your interests
                          </p>
                          <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipi elit.
                            Blanditiis animi iste.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="pr-4">
                          <UserGroupIcon height={30} />
                        </span>
                        <div>
                          <p className="font-bold">
                            Meet others with your interests
                          </p>
                          <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipi elit.
                            Blanditiis animi iste.
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="pr-4">
                          <HeartIcon height={30} />
                        </span>
                        <div>
                          <p className="font-bold">
                            Meet others with your interests
                          </p>
                          <p className="text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipi elit.
                            Blanditiis animi iste.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="mt-8 py-3 font-bold w-full px-6 rounded-full bg-white text-black hover:bg-slate-200">
                      Check it out
                    </button>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </main>
    </div>
  );
};

export default Communities;

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
      process.env.NEXT_PUBLIC_DUMMYAPI_BASE_URL + "user?limit=5",
      {
        method: "GET",
        headers: { "app-id": process.env.DUMMYAPI_TOKEN as string },
      }
    ).then((res) => res.json());
    followResults = fetchedData.data;
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
