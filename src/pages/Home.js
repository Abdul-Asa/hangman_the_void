import React, { useState, useEffect } from 'react';
import {
  Heading,
  Center,
  Stack,
  Flex,
  Box,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Elements/Menu';
import Drop from '../components/Animations/Drop';
import { BackButton } from '../components/Elements/BackButton';
import Suspension from '../components/Elements/Suspension';
import FadeIn from '../components/Animations/FadeIn';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import SlideUp from '../components/Animations/SlideUp';
// import useSound from 'use-sound';
// import audio from '../components/Sounds/audio.mp3';
function Home() {
  const user = JSON.parse(localStorage.getItem('userName'));
  const highScores = JSON.parse(localStorage.getItem('highScores'));
  const [hours, setHours] = useState(new Date().getHours());
  const [minutes, setMinutes] = useState(new Date().getMinutes());
  var counter = 0;
  const navigate = useNavigate();

  // const [playing, setPlaying] = useState(false);

  // const [play, { stop, sound }] = useSound(audio, {
  //   volume: '0.3',
  //   loop: true,
  // });

  if (!user) {
    navigate('/');
  }
  if (!highScores) {
    navigate('/');
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes(new Date().getMinutes());
      console.log(hours, minutes);
      counter++;
    }, 20000);
    setHours(new Date().getHours());
    return () => clearInterval(timer);
  }, [minutes, hours, counter]);

  return (
    <>
      <Drop px={['8', '20']} pt={['8', '20']} pb={'8'} align="center">
        <BackButton type="home" sound />
        <Flex>
          <AnimatedHeading> {hours < 10 ? `0${hours}` : hours}</AnimatedHeading>
          <Box className="blink">
            <Heading
              bgGradient="linear(to-r, red.500, yellow.500)"
              bgClip={'text'}
            >
              :
            </Heading>
          </Box>

          <AnimatedHeading>
            {minutes < 10 ? `0${minutes}` : minutes}
          </AnimatedHeading>
        </Flex>
      </Drop>
      <Center>
        <Stack align={'center'}>
          <Flex align={'center'} direction={['column', 'column', 'row']}>
            <FadeIn>
              <AnimatedHeading fontSize={['22px', '40px']}>
                {hours < 12 && 'Good morning'}
                {hours > 11 && hours < 16 && 'Good afternoon'}
                {hours > 15 && 'Good evening'},{'\u00a0\u00a0'}
              </AnimatedHeading>
            </FadeIn>
            <Suspension user={user} />
          </Flex>{' '}
          <Menu />
          <SlideUp
            align={'center'}
            color={useColorModeValue('brand.3', 'brand.4')}
            pt={[20, 40]}
            fontSize={['xs', 'sm']}
          >
            Made with ❤️ by {'\u00a0'}
            <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
              Shehu
            </Link>{' '}
          </SlideUp>
        </Stack>
      </Center>
    </>
  );
}

export default Home;
