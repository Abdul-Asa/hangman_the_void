import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import AnimatedCharacters from './Sexample';
// import './style.css';

export default function SlidingWords() {
  const [replay, setReplay] = useState(true);
  // Placeholder text data, as if from API
  const placeholderText = [
    { type: 'heading1', text: 'It is simple to write code,' },
    {
      type: 'heading1',
      text: 'but it is hard to write simple code',
    },
    {
      type: 'heading2',
      text: '- Some random guy on twitter',
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  // Quick and dirt for the example
  const handleReplay = () => {
    setReplay(!replay);
    setTimeout(() => {
      setReplay(true);
    }, 600);
  };
  useEffect(() => {
    setTimeout(() => handleReplay(), 5000);
  });

  return (
    <Box
      as={motion.div}
      initial="hidden"
      animate={replay ? 'visible' : 'hidden'}
      variants={container}
      textAlign="center"
      display={'flex'}
    >
      <div>
        {placeholderText.map((item, index) => {
          return <AnimatedCharacters {...item} key={index} />;
        })}
      </div>
    </Box>
  );
}
