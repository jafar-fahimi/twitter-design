import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";

type Props = {
  text: string;
  Icon: any;
  active?: boolean;
};

const SidebarLink: FunctionComponent<Props> = ({ Icon, text, active }) => {
  const router = useRouter();
  return (
    <div
      className={`hoverAnimation flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start ${
        active && "font-bold"
      }`}
      title="Go to Home"
      onClick={() => active && router.push("/")}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
