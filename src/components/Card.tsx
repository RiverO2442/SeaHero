import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  onClick?: () => void;
}

const PADDING_CLASSES = {
  none: "",
  sm:   "p-4",
  md:   "p-6",
  lg:   "p-8",
};

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  hoverable = false,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-xl shadow-sm ${PADDING_CLASSES[padding]} ${
      hoverable ? "hover:shadow-md transition-shadow duration-200 cursor-pointer" : ""
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
