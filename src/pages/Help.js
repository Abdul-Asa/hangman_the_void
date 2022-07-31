import React, { useState } from 'react';
import { Stack, Link, useColorModeValue, Box, Flex } from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';
import ColorModeSwitcher from '../components/Elements/ColorModeSwitcher';
import SoundButton from '../components/Elements/SoundButton';

const Help = () => {
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
              <SoundButton />
            </Flex>
          </Stack>
        </FadeIn>
        <SlideUp
          align={'center'}
          color={useColorModeValue('brand.3', 'brand.4')}
          pt={[270]}
          fontSize={['xs', 'sm']}
        >
          Made with ❤️ by {'\u00a0'}
          <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
            Shehu
          </Link>
        </SlideUp>
      </Stack>
    </>
  );
};

export default Help;
