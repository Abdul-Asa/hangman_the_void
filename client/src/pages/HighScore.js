import React, { useState } from 'react';
import {
  Stack,
  Link,
  ListItem,
  OrderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import { motion } from 'framer-motion';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import useSound from 'use-sound';
import augh from '../components/Sounds/augh.mp3';

const HighScore = () => {
  const hiScores = JSON.parse(localStorage.getItem('highScores'));
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [jokes] = useSound(augh, {
    sprite: { 1: [300, 1700] },
    playbackRate,
    volume: 0.5,
  });
  const handleClick = () => {
    if (playbackRate >= 3) {
      setPlaybackRate(0.75);
    } else {
      setPlaybackRate(playbackRate + 0.3);
      jokes({ id: '1' });
    }
  };
  return (
    <>
      <Drop p={['8', '20']} align="center">
        <BackButton />
      </Drop>
      <Stack align={'center'}>
        <WelcomeDiv>
          <AnimatedHeading fontSize={['22px', '40px']}>
            HighScores{' '}
          </AnimatedHeading>
        </WelcomeDiv>{' '}
        <AnimatedHeading fontSize={['16px', '26px']}>
          <OrderedList
            spacing={3}
            color={useColorModeValue('brand.3', 'brand.4')}
          >
            {hiScores.map((number, index) => {
              return (
                <ListItem
                  key={index}
                  as={motion.li}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    y: [150, 0],
                    opacity: 1,
                    scale: [1.1, 1],
                  }}
                  transition={`${index + 1}.1s ease-out`}
                >
                  {number === 0 ? 'N/A' : number}
                </ListItem>
              );
            })}
          </OrderedList>{' '}
        </AnimatedHeading>
        <SlideUp
          align={'center'}
          color={useColorModeValue('brand.3', 'brand.4')}
          pt={[20, 40]}
          fontSize={['xs', 'sm']}
        >
          Made with {'\u00a0'} <span onClick={handleClick}> ❤️ </span>
          {'\u00a0'} by {'\u00a0'}
          <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
            Shehu
          </Link>{' '}
        </SlideUp>
      </Stack>
    </>
  );
};

export default HighScore;
