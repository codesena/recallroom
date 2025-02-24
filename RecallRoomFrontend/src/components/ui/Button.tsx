import type { ReactElement } from "react";

type variants = "primary" | "secondary";
type sizes = "sm" | "md" | "lg";
interface ButtonProps {
  variant: variants;
  size: sizes;
  text: string;
  onClickfunction?: () => void;
  StartIcon?: ReactElement;
  EndIcon?: ReactElement;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-[#5046e4] text-white   gap-1  hover:cursor-pointer",
  secondary: "bg-[#e0e7ff] text-[#5046e4]  gap-1 hover:cursor-pointer",
};
const defaultStyles = " flex rounded-lg  items-center justify-center ";
const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-2xl",
};

// color e0e7ff 5046e4
export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        // Cursor just changes for an instant correct it in the props.loading section
        className={`
          ${variantStyles[props.variant]} 
          ${defaultStyles} 
          ${sizeStyles[props.size]} 
          ${props.loading ? "opacity-50  cursor-not-allowed" : ""}
          overflow-ellipsis
          `}
        onClick={props.onClickfunction}
        disabled={props.loading}
      >
        {props.StartIcon} {props.text}
      </button>
    </>
  );
};
