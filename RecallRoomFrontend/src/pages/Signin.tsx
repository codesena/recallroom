import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(); //<HTMLInputElement> is used to specify the type of the reference
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  async function signin() {
    const Username = usernameRef.current?.value; // ? is for optional chaining i.e if the value exists then only it will be assigned to Username
    const Password = passwordRef.current?.value;

    console.log(Username, Password);
    // we will get back jwttoken in respose
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username: Username,
      password: Password,
    });
    // alert("Signin successful");
    console.log(response.data.token);
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    // redirect to dashboard
    navigate("/dashboard");
  }
  return (
    <div className="h-screen w-screen bg-slate-700 flex justify-center items-center ">
      <div className="flex flex-col gap-4 bg-white p-8 min-w-48 min-h-48 rounded-md">
        <Input placeholder="Username" reference={usernameRef} />
        <Input placeholder="Password" reference={passwordRef} />
        <Button
          text="Signin"
          variant="primary"
          size="md"
          loading={false}
          onClickfunction={signin}
        />
      </div>
    </div>
  );
}
