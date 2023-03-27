import Trending from "./Trending";
import Image from "next/image";
import { FunctionComponent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type PropsType = {
  trendingResults: {
    tweetText: string;
    tweets: number;
    trendingText: string;
  }[];

  followResults: {
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
  }[];
};

const Widgets: FunctionComponent<PropsType> = ({
  trendingResults,
  followResults,
}) => {
  const [trendingResultAmount, setTrendingResultAmount] = useState(3);
  const [followResultAmount, setFollowResultAmount] = useState(3);
  const router = useRouter();
  const currentPathName = router.asPath.slice(1); // e.g: Explore

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5">
      {currentPathName !== "Explore" && ( // in Explore page trendingResults is shown in center & search above.
        <>
          <div className="sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-9/12">
            <div className="flex items-center bg-[#202327] p-2 rounded-full relative">
              <MagnifyingGlassIcon className="text-gray-500 h-6 p-0 z-50" />
              <input
                type="text"
                className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg"
                placeholder="Search Twitter"
              />
            </div>
          </div>
          <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
            <h4 className="font-bold text-xl px-4">Trends for you</h4>
            {trendingResults.slice(0, trendingResultAmount).map(
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
            <button
              onClick={() => setTrendingResultAmount(trendingResultAmount + 5)}
              className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light"
            >
              Show more
            </button>
          </div>
        </>
      )}

      <div className="text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.slice(0, followResultAmount).map(
          (result: {
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
          }) => (
            <div
              className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
              key={result.login.uuid}
            >
              <Image
                src={result.picture.thumbnail}
                width={50}
                height={50}
                alt="Image"
                className="rounded-full"
              />
              <div className="ml-4 leading-5 group">
                <h4 className="font-bold group-hover:underline">
                  {result.name.first} {result.name.last}
                </h4>
                <h5 className="text-gray-500 text-[15px]">{`@${result.login.username}`}</h5>
              </div>
              <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
                Follow
              </button>
            </div>
          )
        )}
        <button
          onClick={() => setFollowResultAmount(followResultAmount + 5)}
          className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
