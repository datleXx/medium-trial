import React, { forwardRef } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

const PopoverTriggerWrapper = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <HiDotsHorizontal />
    </div>
  );
});

PopoverTriggerWrapper.displayName = "PopoverTriggerWrapper";

export default PopoverTriggerWrapper;
