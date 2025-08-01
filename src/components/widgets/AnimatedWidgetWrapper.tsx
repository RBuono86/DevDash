import React from "react";

type Props = {
  children: React.ReactNode;
};

const AnimatedWidgetWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="transition-transform duration-300 ease-in-out transform hover:scale-105 animate-fade-in">
      {children}
    </div>
  );
};

export default AnimatedWidgetWrapper;
