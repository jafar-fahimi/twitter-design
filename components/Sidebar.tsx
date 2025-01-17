import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalIcon,
  UserGroupIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";

import SidebarLink from "./SidebarLink";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { changedSessionType } from "../utils/typings";
import { FunctionComponent } from "react";
import Link from "next/link";

const Sidebar: FunctionComponent = () => {
  const {
    data: session,
    status,
  }: {
    data: null | changedSessionType;
    status: "loading" | "authenticated" | "unauthenticated";
  } = useSession();

  return (
    <div className="hidden overflow-y-auto overflow-x-hidden !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-600 sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <Link
        href="/"
        title="home"
        className="flex items-center justify-center hoverAnimation xl:ml-24"
      >
        <Image alt="Twitter Logo" src="twitter.svg" width={30} height={30} />
      </Link>
      <div className="mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Communities" Icon={UserGroupIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardDocumentListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold py-3 shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        onClick={() => signOut()}
        className="group relative text-white flex items-center justify-center mt-auto hoverAnimation xl:ml-auto xl:-mr-5"
      >
        <img
          src={session?.user?.image || "people(1).png"}
          alt="User Image"
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5 w-28">
          <h4 className="font-bold">{session?.user?.name || "name"}</h4>
          <p className="text-[#6e767d]">@{session?.user?.tag}</p>
        </div>
        <EllipsisHorizontalIcon className="h-5 hidden xl:inline ml-10" />
        <span className="absolute top-0 lg:top-12 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-sm lg:text-md text-white group-hover:scale-100">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
