import React from "react";
import { componentStyles } from "../../theme";
import classNames from "classnames";

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <div
      className={classNames(
        componentStyles.card.base,
        {
          [componentStyles.card.hover]: hover,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
