import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { commentModalState } from "../atoms/atoms";
import Modal from "../components/CommentModal";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import { PostType } from "../utils/typings";
import { NextPage } from "next";

const PostPage: NextPage<any> = ({
  trendingResults,
  followResults,
  providers,
}) => {
  const [commentIsOpen, setCommentIsOpen] = useRecoilState(commentModalState);
  const [post, setPost] = useState<PostType>();
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // Warning: A title element received an array with more than 1 element as children. In browsers title Elements can only have Text Nodes as children. If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering
  const titleText = `${post?.username} on Twitter: ${post?.text}`;

  return (
    <div>
      <Head>
        <title>{titleText}</title>
        <link rel="icon" href="twitter.svg" />
      </Head>
      <main className="bg-white min-h-screen flex max-w-[1500px] mx-auto">
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
        {commentIsOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;
