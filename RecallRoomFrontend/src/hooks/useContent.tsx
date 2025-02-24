import { useCallback, useState } from "react";
import { BACKEND_URL } from "../Config";
import axios from "axios";

export const useContent = () => {
  const [content, setContent] = useState([]);
  const refresh = useCallback(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setContent(res.data.content));
    console.log("refresh called");
  }, []);
  return { content, refresh };
};
