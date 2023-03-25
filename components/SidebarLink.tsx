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
      className={`hoverAnimation flex items-center justify-center space-x-3 text-xl text-[#d9d9d9] xl:justify-start ${
        active && "font-bold"
      }`}
      title={text}
      onClick={() => router.push(`${text == "Home" ? "/" : text}`)}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
};

export default SidebarLink;
