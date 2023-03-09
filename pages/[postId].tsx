import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { PostType } from "../utils/typings";

function PostPage({ trendingResults, followResults, providers }: any) {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState<PostType>();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id as string} post={post} postPage />
        </div>
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;
