import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../../Config";
import mongoose from "mongoose";
import { RecentIcon } from "../icons/RecentIcon";
import { NewIcon } from "../icons/NewIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { Tags } from "../icons/Tags";

interface CardProps {
  title: string;
  link: string;
  type: ContentType;
  id: mongoose.Types.ObjectId;
  onClick?: () => void;
}
enum ContentType {
  New = "New",
  Recent = "Recent",
  Youtube = "Youtube",
  Twitter = "Twitter",
  Linkedin = "Linkedin",
  Document = "Document",
  Links = "Links",
  Tags = "Tags",
}
const iconMap: Record<keyof typeof ContentType, JSX.Element> = {
  New: <NewIcon size={20} />,
  Recent: <RecentIcon size={20} />,
  Youtube: <YoutubeIcon size={20} />,
  Twitter: <TwitterIcon size={20} />,
  Document: <DocumentIcon size={20} />,
  Linkedin: <LinkedinIcon size={20} />,
  Links: <ShareIcon size={20} />,
  Tags: <Tags size={15} />,
};

export const Card = ({ title, link, type, id, onClick }: CardProps) => {
  function convertToEmbedUrl(youtubeUrl: string): string {
    try {
      let videoId = "";

      if (youtubeUrl.includes("youtu.be")) {
        // Extract video ID from shortened URL
        const parts = youtubeUrl.split("/");
        videoId = parts.pop()?.split("?")[0] || "";
      } else if (youtubeUrl.includes("youtube.com/watch")) {
        // Extract video ID from full URL
        const url = new URL(youtubeUrl);
        videoId = url.searchParams.get("v") || "";
      } else {
        console.log("Invalid YouTube URL");
        return "Invalid YouTube URL";
      }
      if (!videoId) {
        console.log("Invalid YouTube URL");
        return "Invalid YouTube URL";
      }
      return `https://www.youtube.com/embed/${videoId}`;
    } catch (error) {
      console.log("youtube url Error", error);
      return "Invalid YouTube URL" + error;
    }
  }

  const DeleteContent = async () => {
    const res = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
      data: {
        _id: id,
      },
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 200) {
      console.log(res.data.msg);
    }
  };

  const callFucntions = async () => {
    await DeleteContent();
    if (onClick) onClick();
  };
  return (
    <>
      <div>
        <div className=" rounded-md text-black outline-2 outline-slate-200 w-70 m-1 min-h-55 bg-red-200">
          <div className="flex justify-between py-1 border-b-2 border-slate-200">
            <div className="flex mx-2 content-center items-center space-x-3">
              <div className="text-slate-500">
                <div className="text-slate-500">{iconMap[type]}</div>
              </div>
              <div>{title}</div>
            </div>
            <div className="flex  items-center space-x-1 text-slate-500">
              <div className=" hover:cursor-pointer hover:bg-blue-100 rounded-full p-1">
                <ShareIcon size={18} />
              </div>
              <div className=" hover:cursor-pointer hover:bg-blue-100 rounded-full p-1 ">
                <DeleteIcon size={24} onClick={callFucntions} />
              </div>
            </div>
          </div>

          <div className="flex justify-center px-1 py-2 border-slate-300 w-[100%]">
            {type === "Youtube" && (
              <iframe
                width="100%"
                src={convertToEmbedUrl(link)}
                // src={link.replace("watch", "embed").replace("?v=", "/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            )}
            {type === "Twitter" && (
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
              //   <blockquote className="twitter-tweet" data-media-max-width="560">
              //     <a href="https://t.co/ZG7IDEJ3xG" />
              //     <a href={link} />
              //   </blockquote>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
