import React from "react";
import styled from "styled-components";
import { CogIcon } from "../../../components/Svg";
import IconButton from "../../../components/Button/IconButton";
import { MENU_ENTRY_HEIGHT } from "../config";
import { PanelProps, PushedProps } from "../types";
import CakePrice from "./CakePrice";
import ThemeSwitcher from "./ThemeSwitcher";
import SocialLinks from "./SocialLinks";
import LangSelector from "./LangSelector";
import GrainPrice from "./GrainPrice";
import { Link } from "react-router-dom";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Container = styled.div`
  flex: none;
  padding: 8px 4px;
  /* background-color: ${({ theme }) => theme.nav.background}; */
  background-color: #e3e4fb;

  border-top: solid 2px rgba(133, 133, 133, 0.1);
`;

const SettingsEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 8px;
`;

const SocialEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 16px;
`;

const EmptyBox = styled.div`
  height: 10px;
  width: 10px;
`;

const Button = styled.button`
  width: 140px;
  height: 35px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: 400;
  background-color: #aa8929;
  margin-left: 16px;
  &:hover {
    transition: 0.3s;
    background-color: #baa461;
  }
`;

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  grainPriceUsd,
  currentLang,
  langs,
  setLang,
  isMobile,
}) => {
  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;
  if (!isPushed) {
    return (
      <Container>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      {/* <SocialEntry>
        <CakePrice cakePriceUsd={cakePriceUsd} />
        <SocialLinks />
      </SocialEntry>
      <SocialEntry>
        <GrainPrice grainPriceUsd={grainPriceUsd} />
        <EmptyBox />
      </SocialEntry> */}
      <Link onClick={handleClick} to="/showCharts">
        <Button>Price Charts</Button>
      </Link>
      <SettingsEntry>
        {/* <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} /> */}
        {/* <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} /> */}
      </SettingsEntry>
    </Container>
  );
};

export default PanelFooter;
