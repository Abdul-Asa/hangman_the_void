import { Box, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function Drop({ children, ...props }) {
  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 55,
        stiffness: 200,
      },
    },
    exit: {
      y: '-100vh',
      opacity: 0,
    },
  };

  return (
    <Box
      as={motion.div}
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      display={'flex'}
      justifyContent="space-between"
      align="center"
      {...props}
    >
      {children}
    </Box>
  );
}
export default Drop;
