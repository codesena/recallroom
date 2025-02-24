import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../Config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(); //<HTMLInputElement> is used to specify the type of the reference
  const passwordRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  async function signup() {
    const Username = usernameRef.current?.value; // ? is for optional chaining i.e if the value exists then only it will be assigned to Username
    const Password = passwordRef.current?.value;
    const Name = nameRef.current?.value;
    const Email = emailRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username: Username,
      password: Password,
      name: Name,
      email: Email,
    });
    alert("Signup successful");
    navigate("/signin");
  }
  return (
    <div className="h-screen w-screen bg-slate-700 flex justify-center items-center ">
      <div className="flex flex-col gap-4 bg-white p-8 min-w-48 min-h-48 rounded-md">
        <Input placeholder="Name" reference={nameRef} />
        <Input placeholder="Email" reference={emailRef} />
        <Input placeholder="Username" reference={usernameRef} />
        <Input placeholder="Password" reference={passwordRef} />
        <Button
          text="Signup"
          variant="primary"
          size="md"
          loading={false}
          onClickfunction={signup}
        />
      </div>
    </div>
  );
}
