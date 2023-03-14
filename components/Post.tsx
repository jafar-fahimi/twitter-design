// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ArrowsRightLeftIcon,
  ChartBarIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { commentModalState, postIdState } from "../atoms/atoms";
import { db } from "../utils/firebase";
import { changedSessionType } from "../utils/typings";

type Props = { id: string; post: any; postPage?: any };

const Post: FunctionComponent<Props> = ({ id, post, postPage }) => {
  const {
    data: session,
    status,
  }: {
    data: changedSessionType | null;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  const [commentIsOpen, setCommentIsOpen] = useRecoilState(commentModalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [iLiked, setILiked] = useState(false);
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot: any) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot: any) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    // see among likes(collection) & find if I haved iliked this post(return 1).
    () =>
      setILiked(
        likes.findIndex((like: any) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    // if we have iliked d post, delete our like, otherwise add our like.
    if (iLiked) {
      await deleteDoc(
        doc(db, "posts", id, "likes", session?.user?.uid as string)
      );
    } else {
      await setDoc(
        doc(db, "posts", id, "likes", session?.user?.uid as string),
        {
          username: session?.user?.name,
        }
      );
    }
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt="Profile Picture"
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              title="Profile Picture"
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>
            <span className="hover:underline text-sm sm:text-[15px]">
              <span className="relative -top-1 font-bold"> . </span>
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <EllipsisHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setCommentIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>
          {session?.user?.uid === post?.id ? (
            // to check if this post is from this user, show delete icon else show <- ->
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <ArrowsRightLeftIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {iLiked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  iLiked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <div className="icon group" title="share it">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
