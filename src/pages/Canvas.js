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
  Flex,
  useDisclosure,
  HStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import FadeIn from '../components/Animations/FadeIn';
import SlideUp from '../components/Animations/SlideUp';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import { Answers } from '../components/Elements/Answers';
import { TypeStage } from '../components/Elements/TypeArea';
import { InputArea } from '../components/Elements/InputArea';
import CountUp from 'react-countup';

const Canvas = () => {
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

    hiScore[char] = score;
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

  useEffect(() => {
    if (Answers[level]) {
      setCurrent(Answers[level]);
    }
    console.log(level);

    return () => {};
  }, [level]);

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
      <Drop p={['8', '20']} align="center">
        <BackButton />{' '}
        <AnimatedHeading fontSize={['20px', '28px']}>
          {' '}
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
            pt={[20, 32]}
            fontSize={['xs', 'sm']}
          >
            Made with ❤️ by {'\u00a0'}
            <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
              Shehu
            </Link>
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
