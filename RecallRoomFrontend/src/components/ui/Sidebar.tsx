import { useState } from "react";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { Links } from "../icons/LinksIcon";
import { LogoIcon } from "../icons/LogoIcon";
import { NewIcon } from "../icons/NewIcon";
import { RecentIcon } from "../icons/RecentIcon";
import { Tags } from "../icons/Tags";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

interface SidebarProps {
  setTogglecontent?: (content: string) => void;
}

const sidebarItems = [
  { type: "New", text: "New", Icon: NewIcon },
  { type: "Recent", text: "Recent", Icon: RecentIcon },
  { type: "Twitter", text: "Tweets", Icon: TwitterIcon },
  { type: "Linkedin", text: "Linkedin", Icon: LinkedinIcon },
  { type: "Youtube", text: "Videos", Icon: YoutubeIcon },
  { type: "Document", text: "Document", Icon: DocumentIcon },
  { type: "Links", text: "Links", Icon: Links },
  { type: "Tags", text: "Tags", Icon: Tags },
];

export const Sidebar = ({ setTogglecontent }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("");
  return (
    <>
      <div className="h-full w-full bg-slate-300 border-r-2  border-slate-300">
        <div className="fixed ">
          <div
            className="flex pt-3 text-3xl w-full justify-evenly font-bold"
            style={{
              background:
                "linear-gradient(to right, black, #34d399,  #fbbf24, #ef4444, #3b82f6, #475569)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            {<LogoIcon size={30} />}
            RecallRoom
          </div>
          {sidebarItems.map(({ type, text, Icon }) => (
            <SidebarItem
              key={type}
              isOpen={activeItem === type}
              onClick={() => {
                setActiveItem(type); // Toggle active item
                setTogglecontent?.(type);
              }}
              text={text}
              Icon={<Icon size={20} />}
            />
          ))}
        </div>
      </div>
    </>
  );
};
