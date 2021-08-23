import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <image width="32" height="32" href="/images/egg/logo.png" />
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
