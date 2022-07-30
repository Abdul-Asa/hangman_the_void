import React from 'react';
import { Heading, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import './gradient.css';
const AnimatedHeading = ({ children, ...props }) => {
  return (
    <Heading
      as={motion.h1}
      className="gradient"
      bgGradient="linear(-45deg, brand.2, brand.1,#ee7752, #e73c7e)"
      bgClip={'text'}
      fontWeight="bold"
      borderRadius="md"
      textColor={'transparent'}
      // animate={animation}
      {...props}
    >
      {children}
    </Heading>
  );
};

export default AnimatedHeading;
