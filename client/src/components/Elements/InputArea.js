import React from 'react';
import {
  Input,
  HStack,
  Box,
  useMediaQuery,
  Container,
  InputGroup,
} from '@chakra-ui/react';

export const InputArea = ({ current, correct, handleKeyPress, ...props }) => {
  const [isDesktop] = useMediaQuery('(min-width: 50em)');
  return isDesktop ? (
    <InputGroup as={HStack} spacing="4" onKeyDown={handleKeyPress}>
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
    </InputGroup>
  ) : (
    <Container>
      {current.word.split('').map((letter, index) => {
        return letter === ' ' ? (
          <Box key={index} w={['4px', '2ch']} />
        ) : (
          <Input
            autoFocus={index === 0}
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
