import React from "react";
import { SvgProps } from "../../../components/Svg";
import Flex from "../../../components/Box/Flex";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Link from "../../../components/Link/Link";
import * as IconModule from "../icons";
import { socials } from "../config";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const TelegramLink: React.FC = () => (
  <Flex>
    {socials.map((socials, index) => {
      const Icon = Icons[socials.icon];
      const iconProps = {
        width: "32px",
        color: "#aa8929",
        style: { cursor: "pointer" },
      };
      const mr = "12px";
      // if (social.items) {
      //   return (
      //     <Dropdown key={social.label} position="top" target={<Icon {...iconProps} mr={mr} />}>
      //       {social.items.map((item) => (
      //         <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
      //           {item.label}
      //         </Link>
      //       ))}
      //     </Dropdown>
      //   );
      // }
      return (
        <Link
          external
          key={socials.label}
          href={socials.href}
          aria-label={socials.label}
          mr={mr}
        >
          <Icon {...iconProps} />
        </Link>
      );
    })}
  </Flex>
);

export default React.memo(TelegramLink, () => true);
