import React from 'react';
import { Center, Stack } from '@chakra-ui/react';

import WelcomeDiv from '../components/Elements/WelcomeDiv';
import ButtonDrop from '../components/Elements/ButtonDrop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import ColorModeSwitcher from '../components/Elements/ColorModeSwitcher';
import Drop from '../components/Animations/Drop';
import SoundButton from '../components/Elements/SoundButton';
function Welcome() {
  const hi = localStorage.getItem('highScores');
  if (!hi) {
    localStorage.setItem('highScores', JSON.stringify(Array(5).fill(0)));
  }

  return (
    <>
      <Drop p={['8', '20']}>
        <ColorModeSwitcher />
        <SoundButton />
      </Drop>
      <Center alignItems="center" pt={10}>
        <Stack align={'center'} spacing={[20, 0]}>
          <WelcomeDiv>
            <AnimatedHeading fontSize={['22px', '36px']}>
              Welcome to The Void
            </AnimatedHeading>
          </WelcomeDiv>
          <ButtonDrop />
        </Stack>
      </Center>
    </>
  );
}

export default Welcome;