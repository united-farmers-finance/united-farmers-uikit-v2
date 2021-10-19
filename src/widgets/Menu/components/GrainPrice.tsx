import React from "react";
import styled from "styled-components";
import { GrainRoundIcon } from "../../../components/Svg";
import Text from "../../../components/Text/Text";
import Skeleton from "../../../components/Skeleton/Skeleton";

interface Props {
  grainPriceUsd?: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const GrainPrice: React.FC<Props> = ({ grainPriceUsd }) => {
  return grainPriceUsd ? (
    <PriceLink
      href="https://charts.bogged.finance/0x3965E8778e555608aF5B1956f6fFb1F0003Fc3d0"
      target="_blank"
    >
      <GrainRoundIcon width="24px" mr="8px" />
      <Text color="textSubtle" bold>{`$${grainPriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : (
    <Skeleton width={80} height={24} />
  );
};

export default React.memo(GrainPrice);
