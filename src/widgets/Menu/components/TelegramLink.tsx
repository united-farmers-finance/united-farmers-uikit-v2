import React from "react";
import { SvgProps } from "../../../components/Svg";
import Flex from "../../../components/Box/Flex";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Link from "../../../components/Link/Link";
import * as IconModule from "../icons";
import { telegram } from "../config";

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const TelegramLink: React.FC = () => (
  <Flex>
    {telegram.map((telegram, index) => {
      const Icon = Icons[telegram.icon];
      const iconProps = {
        width: "32px",
        color: "textSubtle",
        style: { cursor: "pointer" },
      };
      const mr = "15px";
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
          key={telegram.label}
          href={telegram.href}
          aria-label={telegram.label}
          mr={mr}
        >
          <Icon {...iconProps} />
        </Link>
      );
    })}
  </Flex>
);

export default React.memo(TelegramLink, () => true);
