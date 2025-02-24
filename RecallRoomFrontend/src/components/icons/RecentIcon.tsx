interface RecentIconProps {
  size?: number;
}
export const RecentIcon = ({ size = 24 }: RecentIconProps) => {
  return (
    <svg
      fill="#000000"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <title>recently-viewed</title>
        <polygon points="20.59 22 15 16.41 15 7 17 7 17 15.58 22 20.59 20.59 22"></polygon>
        <path d="M16,2A13.94,13.94,0,0,0,6,6.23V2H4v8h8V8H7.08A12,12,0,1,1,4,16H2A14,14,0,1,0,16,2Z"></path>
        <rect
          id="_Transparent_Rectangle_"
          data-name="<Transparent Rectangle>"
          style={{ fill: "none" }}
          width="32"
          height="32"
        ></rect>
      </g>
    </svg>
  );
};
