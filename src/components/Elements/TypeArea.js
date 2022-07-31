import React from 'react';
import { Button, SimpleGrid, Stack, useMediaQuery } from '@chakra-ui/react';

export const TypeStage = ({ func, ...props }) => {
  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const [isDesktop] = useMediaQuery('(min-width: 50em)');

  return isDesktop ? (
    <Stack align={'center'} spacing={['10px', '10']} pb="">
      <SimpleGrid columns={[4, 8]} spacing="10px">
        {alphabet.slice(0, 8).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
              {...props}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
      <SimpleGrid columns={[4, 9]} spacing="10px">
        {alphabet.slice(8, 17).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
      <SimpleGrid columns={[4, 9]} spacing="10px">
        {alphabet.slice(17, 26).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
    </Stack>
  ) : (
    <Stack align={'center'} spacing={['10px', '10']} pb="">
      <SimpleGrid columns={[4, 8]} spacing="10px">
        {alphabet.slice(0, 8).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
              {...props}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
      <SimpleGrid columns={[4, 8]} spacing="10px">
        {alphabet.slice(8, 16).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
      <SimpleGrid columns={[4, 9]} spacing="10px">
        {alphabet.slice(16, 26).map((letter, index) => {
          return (
            <Button
              key={index}
              value={letter}
              border="1px solid transparent"
              bgGradient="linear(to-r, brand.2, brand.1)"
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _focus={{
                bg: 'transparent',
                border: '1px solid white',
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                bgClip: 'text',
              }}
              size="sm"
              p={5}
              fontSize="l"
              color="white"
              marginLeft="2"
              onClick={func}
            >
              {letter}
            </Button>
          );
        })}
      </SimpleGrid>
    </Stack>
  );
};
