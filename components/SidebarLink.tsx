import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";

type Props = {
  text: string;
  Icon: any;
};

const SidebarLink: FunctionComponent<Props> = ({ Icon, text }) => {
  const router = useRouter();
  const currentPath = router.asPath; // e.g: Explore, /
  const [active, setActive] = useState(currentPath.slice(1) === text);

  React.useEffect(() => {
    if (currentPath === "/" && text === "Home") setActive(true);
  }, []);

  return (
    <div
      className={`group relative hoverAnimation flex items-center justify-center space-x-3 text-xl text-white xl:justify-start ${
        active && "font-bold"
      }`}
      onClick={() =>
        router.push(`${text == "Home" ? "/" : text.toLowerCase()}`)
      }
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
      <span className="absolute top-12 z-50 scale-0 rounded bg-gray-800 px-1 py-[0.5px] text-sm lg:text-md text-white group-hover:scale-100">
        {text}
      </span>
    </div>
  );
};

export default SidebarLink;
