import React from 'react';
import {
  Button,
  Text,
  Stack,
  Input,
  Fade,
  Flex,
  HStack,
  SimpleGrid,
  Box,
} from '@chakra-ui/react';

export const InputArea = ({ current, correct, ...props }) => {
  return (
    <HStack spacing="4">
      {current.word.split('').map((letter, index) => {
        return letter === ' ' ? (
          <Box key={index} w="2ch" />
        ) : (
          <Input
            key={index}
            isReadOnly
            borderColor="white"
            variant={'flushed'}
            bgGradient="linear(to-r, brand.2, brand.1)"
            bgClip={'text'}
            w="2ch"
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
  );
};
