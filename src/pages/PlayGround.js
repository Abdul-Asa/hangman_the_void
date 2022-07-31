import React from 'react';
import { Stack, Link, useColorModeValue } from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';

const PlayGround = () => {
  return (
    <>
      <Drop p={['8', '20']} align="center">
        <BackButton />
      </Drop>
      <Stack align={'center'}>
        <WelcomeDiv>
          <AnimatedHeading>PlayGround</AnimatedHeading>
        </WelcomeDiv>{' '}
        <FadeIn>
          <AnimatedHeading
            bgGradient="linear(to-r, red.500, yellow.500)"
            fontSize={['16px', '26px']}
          >
            Coming soon!
          </AnimatedHeading>
        </FadeIn>
        <SlideUp
          align={'center'}
          color={useColorModeValue('brand.3', 'brand.4')}
          pt={[350]}
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

export default PlayGround;
