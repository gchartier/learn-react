import React from 'react';
import _ from 'lodash';
import * as UI from '@chakra-ui/react';
import * as FramerMotion from 'framer-motion';

interface Symbol {
  score: number;
  type: string;
  targets?: string[];
  sprite?: string;
}

const SymbolLibrary: Record<string, Symbol> = {
  empty: { score: 0, type: 'empty', sprite: '-' },
  A: { score: 10, type: 'A' },
  B: { score: 100, type: 'B' },
  C: { score: 20, type: 'C' },
  D: { score: 5, type: 'D' },
  E: { score: 2, type: 'E' },
};

const SYMBOL_DIMENSION = 100;
const COLUMNS = 5;
const ROWS = 4;
const SYMBOL_COUNT = COLUMNS * ROWS;
const GRID_HEIGHT = ROWS * SYMBOL_DIMENSION;
const GRID_WIDTH = COLUMNS * SYMBOL_DIMENSION;

const MotionUI = {
  Box: FramerMotion.motion(UI.Box),
  Flex: FramerMotion.motion(UI.Flex),
};

// Helper to create an array of animation controls
const useAnimations = (n: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return _.times(n, () => FramerMotion.useAnimation());
};

const pickSymbols = (symbols: Symbol[]): Symbol[] => {
  return _.sampleSize(
    symbols.concat(
      _.fill(Array(Math.max(0, SYMBOL_COUNT - symbols.length)), {
        type: '_',
        score: 0,
      })
    ),
    SYMBOL_COUNT
  );
};

const SlotMachinePage: React.FC = () => {
  // The owned collection of symbols
  const [symbols, setSymbols] = React.useState<Symbol[]>([
    _.clone(SymbolLibrary.A),
    _.clone(SymbolLibrary.B),
    _.clone(SymbolLibrary.C),
    _.clone(SymbolLibrary.D),
    _.clone(SymbolLibrary.E),
  ]);
  // The current displayed symbols (a sampling of owned symbols and empties)
  const [spinSymbols, setSpinSymbols] = React.useState<Symbol[]>([
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    symbols[0],
    SymbolLibrary.empty,
    symbols[1],
    SymbolLibrary.empty,
    symbols[2],
    SymbolLibrary.empty,
    symbols[3],
    SymbolLibrary.empty,
    symbols[4],
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
    SymbolLibrary.empty,
  ]);
  const [spinning, setSpinning] = React.useState(false);
  const symbolAnimations = useAnimations(SYMBOL_COUNT);
  const scoreAnimations = useAnimations(SYMBOL_COUNT);
  const [score, setScore] = React.useState(0);
  const [spinCount, setSpinCount] = React.useState(0);

  const addToScore = (n: number) => {
    setScore((v) => v + n);
  };

  const spin = () => {
    setSpinning(true);
    setSpinCount((n) => n + 1);
    const newSymbols = pickSymbols(symbols);
    setSpinSymbols(newSymbols);
    // handleSpinComplete will be called after new symbols mount
  };

  const handleSpinComplete = async () => {
    await processSpin();
    setSpinning(false);
  };

  const processSpin = async () => {
    // Activate each symbol in order
    for (let i in symbolAnimations) {
      // TODO: Find affected symbols and animate together
      // TODO: Order of operations (change/destroy/add/multiply-score/incerase-score/etc)
      if (!spinSymbols[i].targets) {
        continue;
      }
      await symbolAnimations[i].start(
        { scale: [1, 2, 1, 2, 1] },
        { duration: 0.2 }
      );
      // TODO: change or destroy affected symbols
    }

    // Tabulate groups of identical scores in descending order
    const uniqueSymbolScoresGroups = _.groupBy(spinSymbols, 'score');
    const uniqueSymbolScores = _.compact(
      Object.keys(uniqueSymbolScoresGroups).map((v) => parseInt(v))
    ).sort((a, b) => a - b);
    for (let i in uniqueSymbolScores) {
      const score = uniqueSymbolScores[i];
      const symbolGroup = uniqueSymbolScoresGroups[score];
      await Promise.all(
        symbolGroup.map(async (symbol) => {
          const index = spinSymbols.indexOf(symbol);
          await scoreAnimations[index].start(
            { scale: [0, 1, 1, 0] },
            { times: [0, 0.1, 0.9, 1] }
          );
          // Add to score after this batch of animations completes
          addToScore(symbol.score);
        })
      );
    }
  };

  return (
    <UI.Stack spacing={4} p={4} alignItems="center">
      <UI.Box
        position="relative"
        w={GRID_WIDTH + 4}
        h={GRID_HEIGHT}
        overflow="hidden"
        border="4px solid black"
      >
        {_.times(COLUMNS - 1, (column) => {
          return (
            <UI.Box
              key={column}
              position="absolute"
              bg="black"
              w="4px"
              h={GRID_HEIGHT}
              left={`${SYMBOL_DIMENSION * (column + 1) - 4}px`}
            />
          );
        })}
        <FramerMotion.AnimatePresence onExitComplete={handleSpinComplete}>
          {_.map(spinSymbols, (symbol, i) => {
            const key = [spinCount, i].join('_');
            const column = i % COLUMNS;
            const row = Math.floor(i / COLUMNS);

            return (
              <MotionUI.Flex
                key={key}
                position="absolute"
                alignItems="center"
                justifyContent="center"
                top={row * SYMBOL_DIMENSION}
                left={column * SYMBOL_DIMENSION}
                w={SYMBOL_DIMENSION}
                h={SYMBOL_DIMENSION}
                initial={{ translateY: GRID_HEIGHT }}
                animate={{ translateY: 0 }}
                transition={{ delay: column / 10 }}
                exit={{ translateY: -GRID_HEIGHT }}
              >
                <MotionUI.Flex animate={symbolAnimations[i]}>
                  <UI.Heading>{symbol.sprite || symbol.type}</UI.Heading>
                </MotionUI.Flex>
                <MotionUI.Box
                  position="absolute"
                  bg="red.700"
                  color="white"
                  p={4}
                  pointerEvents="none"
                  initial={{ scale: 0 }}
                  animate={scoreAnimations[i]}
                >
                  <UI.Heading size="sm">+{symbol.score}</UI.Heading>
                </MotionUI.Box>
              </MotionUI.Flex>
            );
          })}
        </FramerMotion.AnimatePresence>
      </UI.Box>
      <UI.Button
        size="lg"
        disabled={spinning}
        colorScheme="green"
        onClick={spin}
      >
        Spin
      </UI.Button>
      <UI.Text>Spinning: {JSON.stringify(spinning)}</UI.Text>
      <UI.Text>Score: {score}</UI.Text>
    </UI.Stack>
  );
};

export default SlotMachinePage;
