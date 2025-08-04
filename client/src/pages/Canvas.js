import React, { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Link,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import FadeIn from '../components/Animations/FadeIn';
import SlideUp from '../components/Animations/SlideUp';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { Ideas } from '../components/Elements/Answers';
import { TypeStage } from '../components/Elements/TypeArea';
import { InputArea } from '../components/Elements/InputArea';
import CountUp from 'react-countup';
import useSound from 'use-sound';
import augh from '../components/Sounds/augh.mp3';
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const Canvas = () => {
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
  const Answers = React.useMemo(() => {
    return shuffle(Ideas);
  }, []);
  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState(Answers[level]);
  const [complete, setComplete] = useState(false);
  const [correct, setCorrect] = useState(
    Array(current.word.length).fill(false)
  );
  const [confam, setConfam] = useState('');
  const [score, setScore] = useState(0);
  const [begin, setBegin] = useState(0);
  const [lose, setLose] = useState(false);
  const { onClose } = useDisclosure();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const [uSure, setSure] = useState(false);

  const nextLevel = () => {
    setBegin(score);
    onClose();
    setComplete(false);
    if (level < Answers.length - 1) {
      setLevel(level + 1);
    } else {
      setDone(true);
    }
    setConfam('');
  };

  const setHigh = () => {
    let hiScore = JSON.parse(localStorage.getItem('highScores'));
    console.log(hiScore);
    let smallest = 0;
    let char = 0;
    hiScore.forEach((element, index) => {
      if (element <= smallest) {
        smallest = element;
        char = index;
      }
    });
    console.log(smallest, char);
    if (score > hiScore[char]) {
      hiScore[char] = score;
    }
    hiScore = hiScore.sort(function (a, b) {
      return b - a;
    });
    console.log(hiScore);
    localStorage.setItem('highScores', JSON.stringify(hiScore));
  };

  const check = e => {
    const { value } = e.target;
    for (let x = 0; x < current.word.length; x++) {
      if (current.word[x] === ' ') {
        setCorrect(inp => {
          return [
            ...inp.slice(0, x),
            true,
            ...inp.slice(x + 1, current.word.length),
          ];
        });
      }
    }

    for (let x = 0; x < current.word.length; x++) {
      if (value === current.word[x]) {
        if (!correct[x] === true) {
          setScore(score + 100);
        }
      }
    }

    if (current.word.includes(value)) {
      setConfam('Correct ✅');
      for (let x = 0; x < current.word.length; x++) {
        if (value === current.word[x]) {
          setCorrect(inp => {
            return [
              ...inp.slice(0, x),
              true,
              ...inp.slice(x + 1, current.word.length),
            ];
          });
        }
      }
    } else {
      if (level === 0 && score <= 80) {
        setScore(0);
      } else {
        setScore(score - 80);
      }
      setConfam('Wrong ❌');
    }
    if (!correct.includes(false)) {
      setComplete(true);
    }
  };
  const handleKeypress = e => {
    console.log(e.code);
    const value = e.code.slice(-1);

    for (let x = 0; x < current.word.length; x++) {
      if (current.word[x] === ' ') {
        setCorrect(inp => {
          return [
            ...inp.slice(0, x),
            true,
            ...inp.slice(x + 1, current.word.length),
          ];
        });
      }
    }

    for (let x = 0; x < current.word.length; x++) {
      if (value === current.word[x]) {
        if (!correct[x] === true) {
          setScore(score + 100);
        }
      }
    }

    if (current.word.includes(value)) {
      setConfam('Correct ✅');
      for (let x = 0; x < current.word.length; x++) {
        if (value === current.word[x]) {
          setCorrect(inp => {
            return [
              ...inp.slice(0, x),
              true,
              ...inp.slice(x + 1, current.word.length),
            ];
          });
        }
      }
    } else {
      if (level === 0 && score <= 80) {
        setScore(0);
      } else {
        setScore(score - 80);
      }
      setConfam('Wrong ❌');
    }
    if (!correct.includes(false)) {
      setComplete(true);
    }
  };

  useEffect(() => {
    if (Answers[level]) {
      setCurrent(Answers[level]);
    }
    console.log(Answers, level);

    return () => {};
  }, [level, Answers]);

  useEffect(() => {
    setCorrect(Array(current.word.length).fill(false));
    return () => {};
  }, [current.word.length]);

  useEffect(() => {
    if (!correct.includes(false)) {
      setComplete(true);
    }
    return () => {};
  }, [correct]);

  useEffect(() => {
    if (level > 0 && score <= 0) {
      setLose(true);
    }
    return () => {};
  }, [level, score]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={uSure}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(-15deg)"
        />
        <ModalContent
          bgColor="white"
          as={motion.div}
          drag
          dragConstraints={{
            top: -10,
            left: -50,
            right: 50,
            bottom: 10,
          }}
        >
          <Stack p={2} align="center" h={'270px'} bgColor="white" rounded="md">
            <>
              <ModalHeader color={'black'}>
                Are you sure you want to leave? 🥺
              </ModalHeader>
              <AnimatedHeading pb={4}>
                {' '}
                Final Score: <CountUp start={begin} end={score} />
              </AnimatedHeading>
              <Button
                autoFocus={false}
                as={motion.button}
                alignItems="center"
                color="white"
                fontWeight="bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                borderRadius="md"
                w="40%"
                bgGradient="linear(to-r, brand.2, brand.1)"
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
                _focus={{
                  bgGradient: 'linear(to-r, brand.2, brand.1)',
                  bgClip: 'text',
                  border: '1px solid black',
                }}
                onClick={() => {
                  navigate(-1);
                  setHigh();
                }}
              >
                Yes, I don't care 😒
              </Button>
              <Button
                as={motion.button}
                alignItems="center"
                color="white"
                fontWeight="bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                borderRadius="md"
                bgGradient="linear(to-r, brand.2, brand.1)"
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
                _focus={{
                  bgGradient: 'linear(to-r, brand.2, brand.1)',
                  bgClip: 'text',
                  border: '1px solid black',
                }}
                onClick={() => {
                  setSure(false);
                }}
              >
                Fine 🙄, I'll stay for you senpai
              </Button>
            </>
            {/*  */}
          </Stack>
        </ModalContent>
      </Modal>
      <Drop p={['8', '20']} align="center">
        <IconButton
          autoFocus={false}
          bgGradient="linear(to-r, brand.2, brand.1)"
          _hover={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',
          }}
          _focus={{
            bg: 'transparent',
            color: 'white',
            border: '1px',
          }}
          size="sm"
          fontSize="lg"
          aria-label={`Go back`}
          variant="ghost"
          color="white"
          marginLeft="2"
          icon={<FaArrowLeft />}
          onClick={() => {
            setSure(true);
          }}
        />
        <AnimatedHeading fontSize={['20px', '28px']}>
          Score: {score}
        </AnimatedHeading>
      </Drop>
      <Center p={8} alignItems="center">
        <Stack align={'center'}>
          <FadeIn color={useColorModeValue('brand.3', 'brand.4')}>
            <InputArea
              current={current}
              correct={correct}
              borderColor={useColorModeValue('brand.3', 'brand.4')}
              handleKeyPress={handleKeypress}
            />
          </FadeIn>
          <SlideUp>
            {' '}
            <Text
              color={useColorModeValue('brand.3', 'brand.4')}
              pb={4}
              fontSize={['sm', 'medium']}
            >
              Hint: {current.hint}
            </Text>
          </SlideUp>
          <Text
            borderColor={useColorModeValue('brand.3', 'brand.4')}
            pb={`10`}
            h={'20px'}
            visibility={confam ? '' : 'hidden'}
          >
            {confam}
          </Text>
          <FadeIn>
            <TypeStage func={check} />
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
      </Center>
      <Modal
        closeOnOverlayClick={false}
        isOpen={complete}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(-15deg)"
        />
        <ModalContent
          as={motion.div}
          drag
          bgColor="#ffffff"
          color={'black'}
          dragConstraints={{
            top: -10,
            left: -50,
            right: 50,
            bottom: 10,
          }}
        >
          <Stack p={2} align="center" h={'230px'}>
            {done ? (
              <>
                <ModalHeader>
                  Congratulations, You reached the end 🎉
                </ModalHeader>
                <AnimatedHeading pb={4}>
                  Final Score: <CountUp start={0} end={score} />
                </AnimatedHeading>
                <Button
                  autoFocus={false}
                  as={motion.button}
                  alignItems="center"
                  color="white"
                  fontWeight="bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  borderRadius="md"
                  w="40%"
                  bgGradient="linear(to-r, brand.2, brand.1)"
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                  _focus={{
                    bgGradient: 'linear(to-r, brand.2, brand.1)',
                    bgClip: 'text',
                    border: '1px solid black',
                  }}
                  onClick={() => {
                    setHigh();
                    navigate(-1);
                  }}
                >
                  Home
                </Button>
              </>
            ) : (
              <>
                <ModalHeader>Word Complete! 🎉</ModalHeader>
                <AnimatedHeading pb={4}>
                  {' '}
                  Score: <CountUp start={begin} end={score} />
                </AnimatedHeading>
                <Button
                  autoFocus={false}
                  as={motion.button}
                  alignItems="center"
                  color="white"
                  fontWeight="bold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  borderRadius="md"
                  w="40%"
                  bgGradient="linear(to-r, brand.2, brand.1)"
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                  _focus={{
                    bgGradient: 'linear(to-r, brand.2, brand.1)',
                    bgClip: 'text',
                    border: '1px solid black',
                  }}
                  onClick={
                    level < Answers.length - 1 ? nextLevel : () => setDone(true)
                  }
                >
                  Next
                </Button>
              </>
            )}
          </Stack>
        </ModalContent>
      </Modal>
      <Modal
        closeOnOverlayClick={false}
        isOpen={lose}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(2px) hue-rotate(-15deg)"
        />
        <ModalContent
          bgColor="white"
          as={motion.div}
          drag
          dragConstraints={{
            top: -10,
            left: -50,
            right: 50,
            bottom: 10,
          }}
        >
          <Stack p={2} align="center" h={'230px'} bgColor="white">
            <>
              <ModalHeader>Sorry, You lose! 😞</ModalHeader>
              <AnimatedHeading pb={4}>
                Final Score: <CountUp start={0} end={score} />
              </AnimatedHeading>
              <Button
                autoFocus={false}
                as={motion.button}
                alignItems="center"
                color="white"
                fontWeight="bold"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                borderRadius="md"
                w="40%"
                bgGradient="linear(to-r, brand.2, brand.1)"
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
                _focus={{
                  bgGradient: 'linear(to-r, brand.2, brand.1)',
                  bgClip: 'text',
                  border: '1px solid black',
                }}
                onClick={() => {
                  navigate(-1);
                  setHigh();
                }}
              >
                Home
              </Button>
            </>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Canvas;
