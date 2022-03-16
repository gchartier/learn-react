import { animate } from 'motion';
import { Car } from '../components/Car';
import { Road } from '../components/Road';
import billboardSrc from '../images/TraylorsOnlyBillboard.png';
import fireSrc from '../images/fire.gif';
import explosionSrc from '../images/explosion.gif';
import * as UI from '@chakra-ui/react';

export function TraylorsOnly() {
  return (
    <UI.Box
      backgroundColor={'lightgreen'}
      overflow={'hidden'}
      position={'relative'}
    >
      <UI.Image
        src={billboardSrc}
        alt="Billboard"
        position={'absolute'}
        left={150}
        top={40}
      />

      <UI.Image
        id="explosion"
        position={'absolute'}
        left={-20}
        top={-100}
        width={700}
        zIndex={20}
        opacity={0}
        src={explosionSrc}
        alt="Explosion"
      />
      <UI.Image
        id="fire"
        position="absolute"
        left={100}
        top={-100}
        width={500}
        zIndex={20}
        opacity={0}
        src={fireSrc}
        alt="Fire"
      />
      <Road />

      <Car id="car1" bottom={-150} left={1100} />
      <Car id="car2" bottom={-150} left={1150} />
      <Car id="car3" bottom={-150} left={800} />
      <Car id="car4" bottom={-200} left={1100} />
      <Car id="car5" bottom={-200} left={1000} />

      <UI.Button
        position={'absolute'}
        top={10}
        right={20}
        backgroundColor={'peachpuff'}
        padding={'25px'}
        fontSize={'2rem'}
        fontFamily={'serif'}
        borderRadius={'25px'}
        onClick={async () => {
          await resetAnimation();
          await normalCars();
          await accident();
        }}
      >
        Play
      </UI.Button>
    </UI.Box>
  );
}

async function resetAnimation() {
  animate(
    '#fire',
    {
      opacity: 0,
    },
    { duration: 0.1 }
  );

  await animate(
    '#car5',
    {
      transform: 'translateY(0px)',
    },
    { duration: 0.1 }
  ).finished;
}

async function normalCars() {
  await animate(
    '#car1',
    {
      transform: ['translateY(0px)', 'translateY(-1200px) scale(.5)'],
    },
    { duration: 3 }
  ).finished;

  await animate(
    '#car2',
    {
      transform: ['translateY(0px)', 'translateY(-1200px) scale(.5)'],
    },
    { duration: 2 }
  ).finished;

  animate(
    '#car3',
    {
      transform: ['translateY(0px)', 'translateY(-1200px) scale(.5)'],
    },
    { duration: 3 }
  );

  await animate(
    '#car4',
    {
      transform: ['translateY(0px)', 'translateY(-1500px) scale(.5)'],
    },
    { duration: 3 }
  ).finished;
}

async function accident() {
  await animate(
    '#car5',
    {
      opacity: 1,
      transform: [
        'translateY(0px) rotate(0deg)',
        'rotate(-42deg) translateY(-1010px)',
        'rotate(-42deg) translate(0px) translateY(-1010px) rotate(720deg)',
      ],
    },
    { duration: 2 }
  ).finished;

  animate(
    '#explosion',
    {
      opacity: [1, 0],
    },
    { duration: 0.8 }
  );

  await animate(
    '#fire',
    {
      opacity: 1,
    },
    { duration: 1 }
  ).finished;
}
