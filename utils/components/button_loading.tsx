import React from "react";

interface Button_loading {
  isLoading: boolean;
  className: string;
  onClick?: () => void;
  type: "submit" | "reset" | "button" | undefined;
  title: string;
}

function Button_loading({
  isLoading,
  className,
  onClick,
  type,
  title,
}: Button_loading) {
  return (
    <button
      disabled={isLoading}
      className={className}
      onClick={onClick}
      type={type}
    >
      {isLoading ? (
        <div className="relative flex items-center justify-center w-[40px] h-[40px] rounded-full border-[8px] border-t-gray-400 border-background animate-spin" />
      ) : (
        title
      )}
    </button>
  );
}

export default Button_loading;
