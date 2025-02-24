import { PlusIcon } from "../components/icons/PlusIcon";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ShareIcon } from "../components/icons/ShareIcon";
import { CreateContentModal } from "../components/ui/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "./../Config";

function Dashboard() {
  const { content, refresh } = useContent();
  const [modalOpen, setModalOpen] = useState(false);
  const [deletecard, setDeletecard] = useState(false);
  const [togglecontent, setTogglecontent] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    refresh();
  }, [submit, deletecard, refresh]);

  return (
    <div className="flex">
      <div className="min-w-[200px] max-w-[300px]">
        <Sidebar setTogglecontent={setTogglecontent} />
      </div>
      <div className="w-full text-xl font-thin  min-h-screen space-y-2 bg-gray-500">
        <div className="flex justify-end gap-4 col-span-9 p-2">
          {modalOpen && (
            <CreateContentModal
              open={modalOpen}
              onClickfunction={() => setModalOpen(false)}
              onSubmitfunction={() => setSubmit(!submit)}
            />
          )}
          <Button
            variant="primary"
            text="Add Content"
            size="sm"
            StartIcon={<PlusIcon />}
            onClickfunction={() => setModalOpen(true)}
          />

          <Button
            variant="secondary"
            text="Share Brain"
            size="sm"
            StartIcon={<ShareIcon />}
            onClickfunction={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                  },
                }
              );
              const shareUrl = `http://localhost:3000/api/v1/brain/${res.data.hash}`;
              alert(`Share this link: ${shareUrl}`);
            }}
          />
        </div>
        <div className="flex flex-wrap justify-center px-2  transition-all duration-700 ease-in-out">
          {content.map(
            ({ type, link, title, _id }) =>
              (!togglecontent || togglecontent === type) && (
                <Card
                  key={_id}
                  id={_id}
                  type={type}
                  title={title}
                  link={link}
                  onClick={() => setDeletecard(!deletecard)}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
