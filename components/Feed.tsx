import { SparklesIcon } from "@heroicons/react/24/outline";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { FunctionComponent, useEffect, useState } from "react";
import { db } from "../utils/firebase";
import Input from "./Input";
import Post from "./Post";

const Feed: FunctionComponent = () => {
  const [posts, setPosts] = useState<DocumentData>([]);

  // fetching data(alldocs) from db dataBase's posts collection, then setPosts state.
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs)
    );
    return () => unsubscribe();
  }, [db]);

  // by flex-grow: 1; our component hold as much size as possible than other comps in container.
  return (
    <div className="max-w-2xl flex-grow border-l border-r border-gray-700 sm:ml-[73px] xl:ml-[370px]">
      <div className="sticky top-0 z-50 flex items-center border-b border-gray-700 bg-black py-2 px-3 text-[#d9d9d9] sm:justify-between">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hoverAnimation ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

      <div className="pb-72">
        {posts.map((post: any) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
};
export default Feed;
