interface InputProps {
  placeholder?: string;
  onChange?: () => void;
  reference?: any;
}

export const Input = (props: InputProps) => {
  return (
    <>
      <input
        type="text"
        className="border-2 border-gray-800 p-2 rounded-lg placeholder-gray-500 text-black text-center"
        placeholder={props.placeholder}
        ref={props.reference}
        onChange={props.onChange}
      />
    </>
  );
};
