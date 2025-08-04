import React, { useState } from 'react';
import { Stack, Link, useColorModeValue, Flex } from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';
import ColorModeSwitcher from '../components/Elements/ColorModeSwitcher';
import SoundButton from '../components/Elements/SoundButton';
import useSound from 'use-sound';
import augh from '../components/Sounds/augh.mp3';

const Help = ({ sound, callback }) => {
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
          <AnimatedHeading>Options</AnimatedHeading>
        </WelcomeDiv>{' '}
        <FadeIn w={['50%', '40%']}>
          <Stack spacing={'10'} color="white" w={'full'} pt={[10, 0]}>
            <Flex justify={'space-between'} align="center">
              <AnimatedHeading
                bgGradient="linear(to-r, red.500, yellow.500)"
                fontSize={['16px', '26px']}
              >
                Color mode
              </AnimatedHeading>
              <ColorModeSwitcher menu />
            </Flex>
            <Flex justify={'space-between'} align="center">
              <AnimatedHeading
                fontSize={['16px', '26px']}
                bgGradient="linear(to-r, red.500, yellow.500)"
              >
                Sound
              </AnimatedHeading>{' '}
              <SoundButton sound={sound} callback={callback} />
            </Flex>
          </Stack>
        </FadeIn>
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

export default Help;
