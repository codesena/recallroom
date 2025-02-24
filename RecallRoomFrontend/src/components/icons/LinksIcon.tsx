interface LinksProps {
  size?: number;
}
export const Links = ({ size = 24 }: LinksProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      id="link-simple-horizontal"
      height={size}
      width={size}
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="79.979"
        x2="175.979"
        y1="127.992"
        y2="127.992"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
      ></line>
      <path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="24"
        d="M103.97266 175.99609h-40a48 48 0 0 1 0-96h40M151.97949 175.99609h40a48 48 0 0 0 0-96h-40"
      ></path>
    </svg>
  );
};
