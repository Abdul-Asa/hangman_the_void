import React from 'react';
import {
  Heading,
  Center,
  Stack,
  Flex,
  Box,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const Menu = () => {
  const navigate = useNavigate();
  return (
    <SimpleGrid columns={[1, 1, 2]} spacing={[10, 20]} pt={[8, 16]}>
      <Button
        as={motion.button}
        alignItems="center"
        color="white"
        h={['3rem', '4rem']}
        width={['12rem', '15rem']}
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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          x: [150, 0],
          opacity: 1,
          scale: 1,
        }}
        transition="0.3s ease-out "
        onClick={() => navigate('/canvas/')}
      >
        Play
      </Button>
      <Button
        as={motion.button}
        alignItems="center"
        color="white"
        h={['3rem', '4rem']}
        width={['12rem', '15rem']}
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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          x: [150, 0],
          opacity: 1,
          scale: 1,
        }}
        transition="0.6s ease-out "
        onClick={() => navigate('/hi-scores/')}
      >
        Highscores
      </Button>{' '}
      <Button
        as={motion.button}
        alignItems="center"
        color="white"
        h={['3rem', '4rem']}
        width={['12rem', '15rem']}
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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          x: [150, 0],
          opacity: 1,
          scale: 1,
        }}
        transition="0.9s ease-out "
        onClick={() => navigate('/options/')}
      >
        Options
      </Button>{' '}
      <Button
        as={motion.button}
        alignItems="center"
        color="white"
        h={['3rem', '4rem']}
        width={['12rem', '15rem']}
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
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          x: [150, 0],
          opacity: 1,
          scale: 1,
        }}
        transition="1.2s ease-out "
        onClick={() => navigate('/playground/')}
      >
        PlayGround
      </Button>
    </SimpleGrid>
  );
};

export default Menu;
