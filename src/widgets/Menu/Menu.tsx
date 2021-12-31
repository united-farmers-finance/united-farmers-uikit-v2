import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import { NavProps } from "./types";
import {
  MENU_HEIGHT,
  SIDEBAR_WIDTH_REDUCED,
  SIDEBAR_WIDTH_FULL,
} from "./config";
import TelegramLink from "./components/TelegramLink";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  /* background-color: ${({ theme }) => theme.nav.background}; */
  background-color: #e3e4fb;

  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  max-width: 100%;
  background-image: url("/images/Back1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) =>
      `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) =>
      `calc(100% - ${
        isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED
      }px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Testing = styled.div`
  display: flex;
  align-items: center;
  min-width: 30%;
  max-width: 300px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  color: #f49725;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  cursor: pointer;
`;

const AnimationShowing = keyframes`
  100% {
    transform: translateX(-66.6666%);
  }
`;

const TextMoving = styled.div`
  animation: ${AnimationShowing} 10s linear infinite;
  white-space: nowrap;
`;

const Menu: React.FC<NavProps> = ({
  userMenu,
  notificationMenu,
  globalMenu,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  grainPriceUsd,
  links,
  children,
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints();
  const isSmallerScreen = isMobile || isTablet;
  const [isPushed, setIsPushed] = useState(!isSmallerScreen);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage =
        window.document.body.clientHeight ===
        currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
        {/* Add testing usermenu */}
        <Flex>{notificationMenu}</Flex>
        <Flex>
          {globalMenu} <TelegramLink /> {userMenu}
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isSmallerScreen}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          grainPriceUsd={grainPriceUsd}
          pushNav={setIsPushed}
          links={links}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay
          show={isPushed}
          onClick={() => setIsPushed(false)}
          role="presentation"
        />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
