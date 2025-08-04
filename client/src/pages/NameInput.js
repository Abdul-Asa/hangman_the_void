import React, { useState } from 'react';
import {
  Heading,
  Center,
  Stack,
  Input,
  Flex,
  Box,
  Button,
  useDisclosure,
  ScaleFade,
  useColorModeValue,
} from '@chakra-ui/react';
import FadeIn from '../components/Animations/FadeIn';
import Drop from '../components/Animations/Drop';
import { BackButton } from '../components/Elements/BackButton';
import '../components/Elements/cursor.css';
import SlideUp from '../components/Animations/SlideUp';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import Click from '../components/Sounds/Click.mp3';

const NameInput = ({ sound }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setName] = useState('');
  const [play] = useSound(Click, {
    sprite: { 1: [700, 1000] },
    interrupt: true,
    soundEnabled: sound,
  });
  const handleInput = e => {
    const { value } = e.target;
    setName(value);
    play({ id: '1' });
    value.length > 2 ? onOpen() : onClose();
  };
  const navigate = useNavigate();

  const handleKeypress = e => {
    const { value } = e.target;
    if (e.keyCode === 13) {
      if (value.length > 2) {
        localStorage.setItem(
          'userName',
          JSON.stringify(userName.toUpperCase())
        );
        navigate('/home/');
      }
    }
  };
  return (
    <>
      <Drop p={['8', '20']}>
        <BackButton sound={sound} windows />
      </Drop>
      <Center p={'8'} alignItems="center">
        <Stack align={'center'}>
          <FadeIn>
            <Heading
              bgGradient="linear(to-l, brand.1, brand.2)"
              bgClip="text"
              fontSize={['22px', '40px']}
            >
              What is your name?
            </Heading>
          </FadeIn>
          {/* <Heading
           
          >
            {userName}
          </Heading> */}
          <Flex pt="4">
            <SlideUp>
              <Input
                style={{ caretColor: 'transparent' }}
                autoFocus
                onChange={handleInput}
                color={useColorModeValue('brand.3', 'brand.4')}
                fontWeight={'bold'}
                fontSize={['16px', '30px']}
                variant="unstyled"
                textAlign={'center'}
                minW="40px"
                value={userName.toUpperCase()}
                w={[
                  `${userName.length * 1.5}ch`,
                  `${userName.length * 1.7}rem`,
                ]}
                onKeyDown={handleKeypress}
              />
              <Box
                className="blink"
                bgGradient="linear(to-r, red.500, yellow.500)"
                h="12"
                w={'1px'}
              />
            </SlideUp>
          </Flex>
          {/* {userName.length() > 3 && onToggle()} */}
          <ScaleFade initialScale={0.9} in={isOpen}>
            <Button
              mt={4}
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
                bg: 'transparent',
                bgGradient: 'linear(to-r, brand.2, brand.1)',
                bgClip: 'text',
                border: '1px',
              }}
              onClick={() => {
                localStorage.setItem(
                  'userName',
                  JSON.stringify(userName.toUpperCase())
                );
                navigate('/home/');
              }}
            >
              Next
            </Button>
          </ScaleFade>
        </Stack>
      </Center>
    </>
  );
};
export default NameInput;
