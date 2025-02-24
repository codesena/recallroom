import { useState } from "react";

interface TypeSelectorProps {
  ContentType: string;
  type: string;
  setType: (type: string) => void;
}
export function TypeSelector({
  ContentType,
  type,
  setType,
}: TypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        className="w-40 px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {type || "Select Type"}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col z-10">
          {Object.values(ContentType).map((contentType) => (
            <button
              key={contentType}
              className={`px-4 py-2 text-left hover:bg-gray-100 ${
                type === contentType ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                setType(contentType);
                setIsOpen(false);
              }}
            >
              {contentType}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
