import React, { useState, useEffect } from 'react';
import {
  Stack,
  Link,
  useColorModeValue,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';
import FadeIn from '../components/Animations/FadeIn';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const PlayGround = () => {
  const user = JSON.parse(localStorage.getItem('userName'));
  const client = new W3CWebSocket('ws://127.0.0.1:8000');
  const [lobby, setLobby] = useState([]);
  // const [clientId] = useState();

  let clientId = null;

  useEffect(() => {
    client.onopen = () => {
      console.log('Connecting to the server...');
    };
    client.onmessage = message => {
      const results = JSON.parse(message.data);
      if (results.method === 'connect') {
        clientId = results.clientId;
        const payLoad = {
          method: 'connected',
          clientId: clientId,
          userName: user,
        };
        client.send(JSON.stringify(payLoad));
      }
      if (results.method === 'online') {
        clientId = results.clientId;
        console.log('successfully connected');
        setLobby(results.lobby);
      }
    };
  }, []);

  // const createGameFunc = () => {
  //   const payLoad = {
  //     method: 'create',
  //     clientId: clientId,
  //     userName: user,
  //   };

  //   ws.send(JSON.stringify(payLoad));
  // };
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
            <UnorderedList>
              {lobby.map((user, index) => {
                return (
                  <ListItem
                    key={index}
                    as={motion.li}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      y: [150, 0],
                      opacity: 1,
                      scale: [1.1, 1],
                    }}
                    transition={`${index + 1}.1s ease-out`}
                  >
                    {user}
                  </ListItem>
                );
              })}
            </UnorderedList>
          </AnimatedHeading>
        </FadeIn>{' '}
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
    </>
  );
};

export default PlayGround;
