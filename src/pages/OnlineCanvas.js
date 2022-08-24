import React, { useState, useEffect } from 'react';
import {
  Stack,
  Link,
  useColorModeValue,
  Text,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalOverlay,
  ModalContent,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import FadeIn from '../components/Animations/FadeIn';
import { TypeStage } from '../components/Elements/TypeArea';
import { FaArrowLeft } from 'react-icons/fa';
import { InputArea } from '../components/Elements/InputArea';
import CountUp from 'react-countup';
// import Chat from '../components/Chat/Chat';
// import { Ideas } from '../components/Elements/Answers';
import { useNavigate } from 'react-router-dom';

const OnlineCanvas = ({
  leaveMatch,
  opp,
  score,
  oppScores,
  updateGame,
  setScore,
  line,
  setLine,
  questions,
  setMatch,
}) => {
  const Answers = React.useMemo(() => {
    return questions;
  }, []);
  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState(Answers[level]);
  const [complete, setComplete] = useState(false);
  const [correct, setCorrect] = useState(
    Array(current.word.length).fill(false)
  );
  const [confam, setConfam] = useState('');
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(7);
  const [timer, setTimer] = useState(15);
  const [leave, setLeave] = useState(false);
  const [finished, setFinished] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('userName'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      clearInterval(interval);
      setStart(true);
    }
    return () => clearInterval(interval);
  }, [count]);
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      if (timer === 0) {
        updateGame();
        clearInterval(interval);
        onOpen();
      }
      return () => clearInterval(interval);
    }
  }, [timer, start]);

  useEffect(() => {
    if (line === true) {
      if (level === 4) {
        setFinished(true);
      } else {
        setTimeout(() => {
          setLevel(level + 1);
          nextLevel();
          setCount(7);
          setTimer(15);
          setStart(false);
          setLine(false);
        }, 5000);
      }
    }
  }, [line]);

  const nextLevel = () => {
    onClose();
    setComplete(false);
    if (level < Answers.length - 1) {
      setLevel(level + 1);
    }
    setConfam('');
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
      setScore(score - 80);
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
    return () => {};
  }, [level, Answers]);

  useEffect(() => {
    setCorrect(Array(current.word.length).fill(false));
    return () => {};
  }, [current]);

  useEffect(() => {
    if (!correct.includes(false)) {
      setComplete(true);
    }
    return () => {};
  }, [correct]);

  const ReturnButton = ({ ...props }) => {
    return (
      <IconButton
        bgGradient="linear(to-r, brand.2, brand.1)"
        _hover={{
          bgGradient: 'linear(to-r, red.500, yellow.500)',
        }}
        _focus={{
          bg: 'transparent',
          bgGradient: 'linear(to-r, brand.2, brand.1)',
          bgClip: 'text',
          border: '1px',
        }}
        size="sm"
        fontSize="lg"
        aria-label={`Go back`}
        variant="ghost"
        color="white"
        marginLeft="2"
        icon={<FaArrowLeft />}
        {...props}
      />
    );
  };

  return (
    <>
      <Drop p={['8', '20']} align="center">
        <ReturnButton onClick={() => setLeave(true)} />
        <AnimatedHeading fontSize={['14px', '28px']}>
          {user} vs {opp.userName}
        </AnimatedHeading>
        <AnimatedHeading fontSize={['14px', '28px']}>
          Score: {score}
        </AnimatedHeading>
        <AnimatedHeading fontSize={['14px', '28px']}>
          Time: {timer}
        </AnimatedHeading>
      </Drop>
      <Stack align={'center'}>
        <FadeIn color={useColorModeValue('brand.3', 'brand.4')}>
          <InputArea
            current={current}
            correct={correct}
            borderColor={useColorModeValue('brand.3', 'brand.4')}
          />
        </FadeIn>
        <SlideUp>
          <Text
            color={useColorModeValue('brand.3', 'brand.4')}
            pb={4}
            fontSize={['sm', 'medium']}
            onClick={nextLevel}
          >
            {start ? 'Hint: ' + current.hint : '   starting in: ' + count}
          </Text>
        </SlideUp>
        <Text
          borderColor={useColorModeValue('brand.3', 'brand.4')}
          pb={`10`}
          h={'20px'}
          visibility={confam ? '' : 'hidden'}
        >
          {complete ? 'Complete 💖' : confam}
        </Text>
        <FadeIn>
          <TypeStage func={check} disabled={!start} />
        </FadeIn>
        <SlideUp
          align={'center'}
          color={useColorModeValue('brand.3', 'brand.4')}
          pt={[200]}
          fontSize={['xs', 'sm']}
        >
          Made with ❤️ by {'\u00a0'}
          <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
            Shehu
          </Link>
        </SlideUp>
      </Stack>
      <>
        <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent alignItems={'center'}>
            <ModalHeader>
              <Flex>
                <AnimatedHeading
                  bgGradient="linear(to-r, red.500, yellow.500)"
                  fontSize={['16px', '26px']}
                  pr="5px"
                >
                  Round {level + 1} complete
                </AnimatedHeading>
                🎉
              </Flex>
            </ModalHeader>
            <ModalBody>
              {' '}
              <AnimatedHeading pb={4}>
                Your Score: <CountUp start={0} end={score} />
              </AnimatedHeading>
              <AnimatedHeading pb={4}>
                {opp.userName}'s Score: <CountUp start={0} end={oppScores} />
              </AnimatedHeading>
            </ModalBody>

            <ModalFooter>
              <Text>Waiting for opponent...</Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={leave} onClose={onClose}>
          <ModalOverlay />
          <ModalContent alignItems={'center'}>
            <ModalHeader>
              <Flex>
                <AnimatedHeading
                  bgGradient="linear(to-r, red.500, yellow.500)"
                  fontSize={['16px', '26px']}
                  pr="5px"
                >
                  Are you sure you want to leave?
                </AnimatedHeading>
              </Flex>
            </ModalHeader>
            <ModalBody>🥺</ModalBody>
            <ModalFooter>
              <Text>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setScore(0);
                    setMatch(false);
                    leaveMatch();
                    console.log('It is I, dio');
                    navigate(-1);
                  }}
                >
                  Yes
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setLeave(false);
                  }}
                >
                  No
                </Button>
              </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={finished} onClose={onClose}>
          <ModalOverlay />
          <ModalContent alignItems={'center'}>
            <ModalHeader>
              <Flex>
                <AnimatedHeading
                  bgGradient="linear(to-r, red.500, yellow.500)"
                  fontSize={['16px', '26px']}
                  pr="5px"
                >
                  Match has ended
                </AnimatedHeading>
              </Flex>
            </ModalHeader>
            <ModalBody>
              <AnimatedHeading pb={4}>
                Your Score: <CountUp start={0} end={score} />
              </AnimatedHeading>
              <AnimatedHeading pb={4}>
                {opp.userName}'s Score: <CountUp start={0} end={oppScores} />
              </AnimatedHeading>
              <Text>
                {oppScores > score ? opp.userName + ' wins 🙄' : 'You win!!😎'}
              </Text>
            </ModalBody>
            <ModalFooter>
              <Text>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    setScore(0);
                    setMatch(false);
                    leaveMatch();
                  }}
                >
                  Done
                </Button>
              </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default OnlineCanvas;
