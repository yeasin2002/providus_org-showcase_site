import React from "react";
type Tprops = {
  title: string;
};
export const Heading = ({ title }: Tprops) => {
  return (
    <div className="text-center mb-6">
      <h3 className="text-[#000000] text-[60px] font-bold">{title}</h3>
    </div>
  );
};
