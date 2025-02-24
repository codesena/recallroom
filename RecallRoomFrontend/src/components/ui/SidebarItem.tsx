import { ReactElement } from "react";

interface SidebarItemProps {
  isOpen: boolean;
  Icon: ReactElement;
  text?: string;
  onClick?: () => void;
}

export const SidebarItem = (props: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center px-10 w-full p-2 gap-3 cursor-pointer 
      ${
        props.isOpen
          ? "bg-blue-300  text-slate-700"
          : "text-slate-500 hover:bg-slate-200"
      }`}
      onClick={props.onClick}
    >
      {props.Icon}
      {props.text}
    </div>
  );
};
