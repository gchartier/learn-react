import React from 'react';
import * as UI from '@chakra-ui/react';
import _ from 'lodash';
import { animated, useSpring } from 'react-spring';

import images from '../images';

var slotsAudio = new Audio('slots.mp3');
slotsAudio.volume = 0.1;

const SpringUI = {
  Box: animated(UI.Box),
};

interface Symbol {
  name: string;
  image: string;
}

const Symbols: Record<string, Symbol> = {
  Gabe: { name: 'Gabe', image: images.Gabe },
  Brent: { name: 'Brent', image: images.Brent },
  Brandon: { name: 'Brandon', image: images.Brandon },
  Jon: { name: 'Jon', image: images.Jon },
  Paul: { name: 'Paul', image: images.Paul },
  Linc: { name: 'Linc', image: images.Linc },
};

const reelSymbols = [
  Symbols.Gabe,
  Symbols.Brent,
  Symbols.Brandon,
  Symbols.Jon,
  Symbols.Paul,
  Symbols.Linc,
];

const getY = (n: number, len: number) => {
  return Math.sin((((n * 360) / len) * Math.PI) / 180);
};

const getX = (n: number, len: number) => {
  return Math.cos((((n * 360) / len) * Math.PI) / 180);
};

const Reel: React.FC<{ reelOffset: number }> = ({ reelOffset }) => {
  const { reelOffset: animatedReelOffset } = useSpring({
    reelOffset,
    config: { friction: 60 },
  });

  return (
    <UI.Box position="relative" width="300px" height="300px">
      {_.map(reelSymbols, (symbol, i) => {
        return (
          <SpringUI.Box
            as="img"
            src={symbol.image}
            alt=""
            width="100px"
            height="100px"
            position="absolute"
            left="0px"
            style={{
              opacity: animatedReelOffset.interpolate((x) =>
                getX(x + i, reelSymbols.length) > 0 ? 1 : 0
              ),
              scaleY: animatedReelOffset.interpolate(
                (x) => 1 - Math.abs(getY(x + i, reelSymbols.length))
              ),
              top: animatedReelOffset.interpolate(
                (x) => 100 * (1 + getY(x + i, reelSymbols.length))
              ),
            }}
          />
        );
      })}
    </UI.Box>
  );
};

const SlotMachinePage: React.FC = () => {
  const [reelOffset1, setReelOffset1] = React.useState(0);
  const [reelOffset2, setReelOffset2] = React.useState(0);
  const [reelOffset3, setReelOffset3] = React.useState(0);

  const spin = () => {
    slotsAudio.play();
    setReelOffset1((n) => n + 100 + _.random(100));
    setReelOffset2((n) => n + 100 + _.random(100));
    setReelOffset3((n) => n + 100 + _.random(100));
  };

  return (
    <UI.Box textAlign="center">
      <UI.Flex w="320px" mx="auto" border="2px solid black">
        <Reel reelOffset={reelOffset1} />
        <Reel reelOffset={reelOffset2} />
        <Reel reelOffset={reelOffset3} />
      </UI.Flex>
      <UI.Button onClick={spin}>Spin</UI.Button>
      <UI.Text>
        [{reelSymbols[reelOffset1 % reelSymbols.length].name}|
        {reelSymbols[reelOffset2 % reelSymbols.length].name}|
        {reelSymbols[reelOffset3 % reelSymbols.length].name}]
      </UI.Text>
    </UI.Box>
  );
};

export default SlotMachinePage;
