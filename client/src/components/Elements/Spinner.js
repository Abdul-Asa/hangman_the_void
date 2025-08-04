import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import SlidingWords from './SlidingWords';
const Spinners = () => {
  const loadingContainer = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-around',
  };
  const loadingCircle = {
    display: 'block',
    width: '1rem',
    height: '1rem',
    backgroundColor: '#FF0088',
    borderRadius: '0.5rem',
  };
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '60%',
    },
  };
  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <Stack pt={[16, 40]} px={['22px', 20]} align={'center'} spacing="4">
      <Box
        as={motion.div}
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </Box>
      <SlidingWords />

      <Text pt="10" fontSize={'sm'} fontFamily="monospace">
        PS - This looks way better on a desktop device
      </Text>
    </Stack>
  );
};

export default Spinners;
