import React, { AnchorHTMLAttributes } from "react";
import { NavLink } from "react-router-dom";

const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  target,
  ...otherProps
}) => {
  const isHttpLink = href?.startsWith("http");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag: any = isHttpLink ? "a" : NavLink;
  const props = isHttpLink ? { href } : { to: href };
  if (target) {
    return <Tag role="button" target={target} {...props} {...otherProps} />;
  } else {
    return <Tag role="button" {...props} {...otherProps} />;
  }
};

export default MenuLink;
