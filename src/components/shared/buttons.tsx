import { MoveUpRight } from "lucide-react";

export const CTAButton = ({ text }: { text: string }) => {
  return (
    <button
      className="bg-[#C79C44] hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-full inline-flex items-center gap-4 transition-all hover:scale-90"
      type="button"
    >
      <span>{text}</span>
      <div className="bg-white p-3 flex  rounded-full  ">
        <MoveUpRight className="w-5 h-5" color="black" />
      </div>
    </button>
  );
};
export const PrimaryButton = ({ text }: { text: string }) => {
  return (
    <button
      className="bg-[#C79C441F] text-[#023C5E] font-bold flex gap-3 px-4 py-3 rounded-full "
      type="button"
    >
      <svg
        width={"24"} // Default size 24 if not provided
        height={"24"} // Default size 24 if not provided
        viewBox="0 0 100 100" // A common viewBox that can scale well
        fill="none" // No fill for the SVG container itself
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Arrow</title>
        <path
          d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
          fill={"#003366"}
        />
        <path d="M50 35L55.8 50L50 65L44.2 50L50 35Z" fill={"#FFFFFF"} />
      </svg>
      {text}
    </button>
  );
};
