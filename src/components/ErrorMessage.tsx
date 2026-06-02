import React from "react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = "" }) => {
  if (!message) return null;

  return (
    <p
      role="alert"
      className={`flex items-center gap-1.5 text-xs font-medium text-red-600 mt-1 ${className}`}
    >
      <span className="material-symbols-outlined text-sm leading-none">error</span>
      {message}
    </p>
  );
};

export default ErrorMessage;
