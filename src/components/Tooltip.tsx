import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const POSITION_CLASSES: Record<NonNullable<TooltipProps["position"]>, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" }) => {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          className={`absolute ${POSITION_CLASSES[position]} z-50 whitespace-nowrap bg-slate-800 text-white text-xs font-medium px-2.5 py-1.5 rounded-lg pointer-events-none`}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
