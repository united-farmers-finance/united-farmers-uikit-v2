import React, { HTMLAttributeAnchorTarget } from "react";
import { DefaultTheme } from "styled-components";
import { Colors } from "../../../theme/types";
export interface Props {
    secondary?: boolean;
    isActive?: boolean;
    theme: DefaultTheme;
    target?: HTMLAttributeAnchorTarget | undefined;
}
declare const MenuEntry: import("styled-components").StyledComponent<"div", DefaultTheme, Props, never>;
declare const LinkStatus: import("styled-components").StyledComponent<"div", DefaultTheme, import("../../../components/Text").TextProps & {
    color: keyof Colors;
}, never>;
declare const LinkLabelMemo: React.MemoExoticComponent<import("styled-components").StyledComponent<"div", DefaultTheme, {
    isPushed: boolean;
}, never>>;
export { MenuEntry, LinkStatus, LinkLabelMemo as LinkLabel };
