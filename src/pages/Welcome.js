import React from 'react';
import { Center, Stack, Flex } from '@chakra-ui/react';
// import useSound from 'use-sound';
// import Xboxsfx from '../components/Sounds/Xbox.mp3';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import ButtonDrop from '../components/Elements/ButtonDrop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import ColorModeSwitcher from '../components/Elements/ColorModeSwitcher';
import Drop from '../components/Animations/Drop';
import SoundButton from '../components/Elements/SoundButton';
import HelpText from '../components/Elements/HelpText';
function Welcome() {
  // const [showing, setShowing] = useState(true);
  // const [play] = useSound(Xboxsfx, {
  //   sprite: { pew: [3000, 3000] },
  //   interrupt: true,
  //   soundEnabled: true,
  // });
  // const [played, setPlayed] = useState(false);
  const hi = localStorage.getItem('highScores');
  if (!hi) {
    localStorage.setItem('highScores', JSON.stringify(Array(5).fill(0)));
  }
  return (
    <>
      <Drop p={['8', '20']}>
        <Flex align={'center'}>
          <ColorModeSwitcher />
          <HelpText />
        </Flex>
        <SoundButton />
      </Drop>
      <Center
        alignItems="center"
        pt={10}
        // onClick={play}
        // onMouseEnter={() => {
        //   if (played === false) play({ id: 'pew' });
        //   setPlayed(true);
        // }}
      >
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
