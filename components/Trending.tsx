import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { FunctionComponent } from "react";

type PropsType = {
  result: { tweetText: string; tweets: number; trendingText: string };
};

const Trending: FunctionComponent<PropsType> = ({ result }) => {
  return (
    <div className="px-3 py-1 rounded-md hover:bg-gray-800/10">
      <div className="py-1 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
        <span className="text-gray-500">{result.trendingText}</span>
        <span className="p-1 rounded-full hover:bg-gray-800/90">
          <EllipsisHorizontalIcon className="h-5 text-gray-400 group-hover:text-[#1d9bf0]" />
        </span>
      </div>
      <p className="font-bold hover:cursor-pointer hover:underline">
        &#x23;{result.tweetText}
      </p>
      <p className="text-gray-500">{result.tweets} Tweets</p>
    </div>
  );
};

export default Trending;
