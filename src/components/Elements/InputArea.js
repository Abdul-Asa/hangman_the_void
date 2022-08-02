import React from 'react';
import { Input, HStack, Box, useMediaQuery, Container } from '@chakra-ui/react';

export const InputArea = ({ current, correct, ...props }) => {
  const [isDesktop] = useMediaQuery('(min-width: 50em)');

  return isDesktop ? (
    <HStack spacing="4">
      {current.word.split('').map((letter, index) => {
        return letter === ' ' ? (
          <Box key={index} w={['4px', '2ch']} />
        ) : (
          <Input
            key={index}
            isReadOnly
            borderColor="white"
            variant={'flushed'}
            bgGradient="linear(to-r, brand.2, brand.1)"
            bgClip={'text'}
            w={['16px', '2ch']}
            fontWeight={'bold'}
            fontSize={['16px', '25px']}
            textAlign={'center'}
            value={
              correct[index] === true ? letter.toUpperCase() : '\u00a0\u00a0'
            }
            {...props}
          />
        );
      })}
    </HStack>
  ) : (
    <Container>
      {current.word.split('').map((letter, index) => {
        return letter === ' ' ? (
          <Box key={index} w={['4px', '2ch']} />
        ) : (
          <Input
            key={index}
            ml={'4px'}
            isReadOnly
            borderColor="white"
            variant={'flushed'}
            bgGradient="linear(to-r, brand.2, brand.1)"
            bgClip={'text'}
            w={['16px', '2ch']}
            fontWeight={'bold'}
            fontSize={['16px', '25px']}
            textAlign={'center'}
            value={
              correct[index] === true ? letter.toUpperCase() : '\u00a0\u00a0'
            }
            {...props}
          />
        );
      })}
    </Container>
  );
};
