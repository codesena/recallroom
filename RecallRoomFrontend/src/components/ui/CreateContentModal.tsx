import { useRef, useState } from "react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../../Config";
import axios from "axios";
interface CreateContentModalProps {
  open: boolean;
  // setModalOpen?: (open: boolean) => void;
  onClickfunction: () => void;
  onSubmitfunction: () => void;
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

export const CreateContentModal = (props: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState("");

  const link = linkRef.current?.value.trim();
  const title = titleRef.current?.value.trim();
  async function createContent() {
    console.log(title, link, type);
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res.data);
  }

  async function callFucntions() {
    if (title && link && type) {
      await createContent();
      props.onSubmitfunction();
      props.onClickfunction();
    } else alert("Please fill all the fields");
  }
  return (
    <div
      className="fixed inset-0   bg-slate-900/70 flex justify-center items-center"
      onClick={props.onClickfunction}
    >
      <div
        className="flex flex-col bg-gray-50 rounded-md p-3 min-h-72"
        onClick={(e) => {
          e.stopPropagation(); // Prevent parent `onClick` from triggering
        }}
      >
        <div className="flex items-center justify-between text-black w-full  ">
          <div className="flex-1 text-center text-2xl font-bold">Add Note</div>
          <div
            className="cursor-pointer  rounded-full bg-[#e0e7ff] p-1 flex items-center justify-center"
            onClick={props.onClickfunction}
          >
            <DeleteIcon size={24} />
          </div>
        </div>

        <div className="flex flex-col gap-6 p-4 items-center ">
          <Input placeholder="Title" reference={titleRef} />
          <Input placeholder="Link" reference={linkRef} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 p-3">
          {Object.values(ContentType).map((contentType) => (
            <Button
              key={contentType}
              variant={type === contentType ? "primary" : "secondary"}
              size="sm"
              text={contentType}
              onClickfunction={() => setType(contentType)}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="primary"
            size="sm"
            text="Submit"
            onClickfunction={callFucntions}
          />
        </div>
      </div>
    </div>
  );
};
