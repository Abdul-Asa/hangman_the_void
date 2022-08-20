import React, { useState, useEffect } from 'react';
import {
  Stack,
  Link,
  useColorModeValue,
  Flex,
  Button,
  Modal,
  Spinner,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useNavigate } from 'react-router-dom';

const PlayGround = () => {
  const HOST =
    process.env.NODE_ENV === 'development'
      ? 'ws://127.0.0.1:8000'
      : 'wss://hangman-websocket.herokuapp.com/';
  const client = new W3CWebSocket(HOST);
  const user = JSON.parse(localStorage.getItem('userName'));
  const [lobby, setLobby] = useState([]);
  const [userId, setId] = useState();
  const [opp, setOpp] = useState('');
  const { onClose } = useDisclosure();
  const [uSure, setSure] = useState(false);
  const [yay, setYay] = useState(false);
  // const [match, setMatch] = useState(false);

  let navigate = useNavigate();

  let clientId = null;

  useEffect(() => {
    client.onopen = () => {
      console.log('Connecting to the server...');
    };
    client.onmessage = message => {
      const results = JSON.parse(message.data);
      if (results.method === 'connect') {
        clientId = results.clientId;
        setId(clientId);
        const payLoad = {
          method: 'connected',
          clientId: clientId,
          userName: user,
        };
        client.send(JSON.stringify(payLoad));
      }
      if (results.method === 'online') {
        console.log('successfully connected');
        setLobby(results.lobby);
      }
      if (results.method === 'inviteGame') {
        console.log(results);
        setYay(true);
        setOpp({ oppName: results.oppName, oppId: results.oppId });
        // const payLoad = {
        //   method: 'connected',
        //   oppName: results,
        //   userName: user,
        // };
        // client.send(JSON.stringify(payLoad));
      }
    };
  }, []);
  const logOut = () => {
    const payLoad = {
      method: 'disconnected',
      clientId: userId,
      userName: user,
    };
    client.send(JSON.stringify(payLoad));
    console.log('Disconnected');
    client.close();
  };

  const startGame = e => {
    const { value, name } = e.target;
    const payLoad = {
      method: 'createGame',
      clientId: userId,
      clientName: user,
      oppId: value,
      oppName: name,
    };
    console.log(payLoad);
    client.send(JSON.stringify(payLoad));
  };

  // const acceptInvite = () => {
  //   const payLoad = {
  //     method: 'createGame',
  //     clientId: userId,
  //     clientName: user,
  //     oppId: opp.oppId,
  //     oppName: opp.oppName,
  //   };
  //   client.send(JSON.stringify(payLoad));
  //   setMatch(true);
  // };
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
          <Stack p={2} align="center" bgColor="white" rounded="md">
            <>
              <AnimatedHeading pb={4}>Waiting for response...</AnimatedHeading>
              <Spinner color="black" />
              <Button
                alignItems="center"
                color="white"
                fontWeight="bold"
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
                  setSure(false);
                  logOut();
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
            </>
          </Stack>
        </ModalContent>
      </Modal>
      <Drop p={['8', '20']} align="center">
        <BackButton func={logOut} />
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
            Players Online:
          </AnimatedHeading>
        </FadeIn>{' '}
        <Stack
          spacing={'10'}
          w={['80%', '40%']}
          pt={[10, 0]}
          color={useColorModeValue('brand.3', 'brand.4')}
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
                  value={player.iD}
                  onClick={e => {
                    startGame(e);
                    setSure(true);
                  }}
                >
                  Join
                </Button>
              </Flex>
            );
          })}
        </Stack>
        {/* <Button onClick={createGameFunc}>Create game</Button>
        <Input />
        <Button onClick={createGameFunc}>join game</Button> */}
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
      <Modal
        closeOnOverlayClick={false}
        isOpen={yay}
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
          <Stack
            p={2}
            align="center"
            bgColor="white"
            rounded="md"
            textAlign={'center'}
          >
            <AnimatedHeading pb={4}>
              {opp.oppName} invites you to a match
            </AnimatedHeading>
            <Button
              autoFocus={false}
              alignItems="center"
              color="white"
              fontWeight="bold"
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
            >
              Accept
            </Button>
            <Button
              color={'black'}
              borderRadius="md"
              w="40%"
              border={'1px solid black'}
              onClick={() => setYay(false)}
            >
              Decline
            </Button>
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlayGround;
