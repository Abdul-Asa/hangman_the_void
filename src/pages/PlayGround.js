import React, { useState, useEffect, useRef } from 'react';
import {
  Stack,
  Link,
  Flex,
  Button,
  useDisclosure,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
// import { motion } from 'framer-motion';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import OnlineCanvas from './OnlineCanvas';

const PlayGround = () => {
  const user = JSON.parse(localStorage.getItem('userName'));
  const HOST =
    process.env.NODE_ENV === 'development'
      ? 'ws://127.0.0.1:8000'
      : 'wss://hangman-websocket.herokuapp.com/';
  const ws = useRef(null);
  const [online, setOnline] = useState(false);
  const [userId, setUserId] = useState();
  const [lobby, setLobby] = useState([]);
  const [opp, setOpp] = useState({ userName: '' });
  const [message, setMessage] = useState();
  const [game, setGame] = useState('');
  const [match, setMatch] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setquestion] = useState();
  const [oppScores, setOppscores] = useState(0);
  const [line, setLine] = useState(0);
  const [quit, setQuit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    ws.current = new W3CWebSocket(HOST);
    ws.current.onopen = () => {
      console.log('connecting to the server...');
    };
    ws.current.onmessage = message => {
      const results = JSON.parse(message.data);
      if (results.method === 'connect') {
        console.log('connected');
        setUserId(results.clientId);
        setOnline(true);
        const payLoad = {
          method: 'connected',
          userName: user,
          id: results.clientId,
        };
        ws.current.send(JSON.stringify(payLoad));
      }
      if (results.method === 'online') {
        setLobby(results.lobby);
      }
      if (results.method === 'invite') {
        console.log(results.gameId);
        setGame(results.gameId);
        onOpen();
        setMessage(results.message);
      }
      if (results.method === 'invitation') {
        console.log(results.gameId);
        setGame(results.gameId);
        setOpp({ id: results.oppId, userName: results.oppName });
        onClose();
        setInvitation(true);
      }
      if (results.method === 'lol') {
        setRejected(true);
        setGame('');
      }
      if (results.method === 'noice') {
        onClose();
        setquestion(results.questions.Ideas);
        console.log('Match starting...');
        setMatch(true);
      }
      if (results.method === 'round') {
        if (results.oppName === user) {
          setOppscores(results.score);
        }
        console.log(results);
        setLine(true);
      }
      if (results.method === 'wait') {
        if (results.oppName === user) {
          setOppscores(results.score);
        }
      }
      if (results.method === 'quit') {
        console.log(results);
        setOpp('');
        setOppscores('');
        setGame('');
        setMessage('');
        setQuit(true);
      }
    };
    ws.current.onerror = err => {
      console.log(err);
    };
    ws.current.onclose = () => {
      console.log('Disconnected from the server...');
    };
    return () => {
      if (ws.current.readyState === 1) {
        leaveMatch();
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (ws.current.readyState !== 1) {
      setOnline(false);
    }
  }, [ws]);
  useEffect(() => {
    if (rejected) {
      setMessage(opp.userName + ' rejected your challenge');
    }
    if (game && !rejected) {
      console.log('suck my pussay');
    }
  }, [rejected, game, opp]);

  const startGame = e => {
    const { value, name } = e.target;
    const payLoad = {
      method: 'createGame',
      clientId: userId,
      clientName: user,
      oppId: value,
      oppName: name,
    };
    ws.current.send(JSON.stringify(payLoad));
    setOpp({ id: value, userName: name });
  };
  const acceptInvite = () => {
    const payLoad = {
      method: 'accepted',
      clientId: userId,
      clientName: user,
      oppId: opp.id,
      oppName: opp.userName,
    };
    ws.current.send(JSON.stringify(payLoad));
  };
  const rejectInvite = () => {
    const payLoad = {
      method: 'rejected',
      clientId: userId,
      clientName: user,
      oppId: opp.id,
      oppName: opp.userName,
    };
    ws.current.send(JSON.stringify(payLoad));
    setOpp({ userName: '' });
  };
  const updateGameState = () => {
    const payLoad = {
      method: 'play',
      clientId: userId,
      clientName: user,
      oppId: opp.id,
      oppName: opp.userName,
      score: score,
      gameId: game,
      // level: level,
    };
    ws.current.send(JSON.stringify(payLoad));
  };
  const leaveMatch = () => {
    const payLoad = {
      method: 'endMatch',
      clientId: userId,
      clientName: user,
      oppId: opp.id,
      oppName: opp.userName,
      gameId: game,
    };
    ws.current.send(JSON.stringify(payLoad));
    setOpp('');
    setOppscores('');
    setGame('');
    setMessage('');
  };

  return match ? (
    <>
      <Modal isOpen={quit} onClose={onClose}>
        <ModalOverlay />
        <ModalContent alignItems={'center'}>
          <ModalHeader>
            <AnimatedHeading
              bgGradient="linear(to-r, red.500, yellow.500)"
              fontSize={['16px', '26px']}
            >
              Opponent quits the match
            </AnimatedHeading>
          </ModalHeader>
          <ModalBody>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setScore(0);
                setQuit(false);
                setMatch(false);
              }}
            >
              Pussy😒
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <OnlineCanvas
        match={match}
        setMatch={setMatch}
        leaveMatch={leaveMatch}
        userId={userId}
        opp={opp}
        gameId={game}
        updateGame={updateGameState}
        score={score}
        line={line}
        setLine={setLine}
        setScore={setScore}
        oppScores={oppScores}
        questions={questions}
      />
    </>
  ) : (
    <>
      <Drop p={['8', '20']} align="center">
        <BackButton />
      </Drop>
      <Stack align={'center'}>
        <WelcomeDiv>
          <AnimatedHeading>PlayGround</AnimatedHeading>
        </WelcomeDiv>
        <FadeIn>
          <AnimatedHeading
            bgGradient="linear(to-r, red.500, yellow.500)"
            fontSize={['16px', '26px']}
          >
            Players online:
          </AnimatedHeading>
        </FadeIn>
        {online ? (
          <Stack
            spacing={'10'}
            w={['80%', '40%']}
            pt={[10, 0]}
            overflow="hidden"
          >
            {lobby.map((player, index) => {
              return (
                <Flex
                  justify={'space-between'}
                  align="center"
                  key={index}
                  border="1px solid "
                  p={2}
                  rounded={'md'}
                >
                  <AnimatedHeading
                    bgGradient="linear(to-r, red.500, yellow.500)"
                    fontSize={['16px', '26px']}
                  >
                    {player.userName}
                  </AnimatedHeading>
                  <Button
                    isDisabled={user === player.userName}
                    name={player.userName}
                    value={player.id}
                    onClick={e => {
                      startGame(e);
                    }}
                  >
                    Join
                  </Button>
                </Flex>
              );
            })}
          </Stack>
        ) : (
          <>
            <AnimatedHeading
              bgGradient="linear(to-r, red.500, yellow.500)"
              fontSize={['16px', '26px']}
            >
              You are offline, Try again later
            </AnimatedHeading>
          </>
        )}
        <SlideUp align={'center'} py={'10%'} fontSize={['xs', 'sm']}>
          Made with ❤️ by {'\u00a0'}
          <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
            Shehu
          </Link>
        </SlideUp>
      </Stack>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent alignItems={'center'}>
            <ModalHeader>
              <AnimatedHeading
                bgGradient="linear(to-r, red.500, yellow.500)"
                fontSize={['16px', '26px']}
              >
                {message}
              </AnimatedHeading>
            </ModalHeader>
            <ModalBody>{rejected ? '😝' : <Spinner />}</ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  onClose();
                  setRejected(false);
                  setMessage('');
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={invitation} onClose={onClose}>
          <ModalOverlay />
          <ModalContent alignItems={'center'}>
            <ModalHeader>
              <AnimatedHeading
                bgGradient="linear(to-r, red.500, yellow.500)"
                fontSize={['16px', '26px']}
              >
                {opp.userName} challenges you to a match
              </AnimatedHeading>
            </ModalHeader>
            <ModalBody>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setInvitation(false);
                  acceptInvite();
                }}
              >
                Accept
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setInvitation(false);
                  rejectInvite();
                }}
              >
                Decline
              </Button>{' '}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};
export default PlayGround;
