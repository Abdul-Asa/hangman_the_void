import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function FadeIn({ children, ...props }) {
  const fadeIn = {
    hidden: {
      x: '-100vh',
      opacity: 0,
    },
    visible: {
      x: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 55,
        stiffness: 200,
      },
    },
    exit: {
      x: '-100vh',
      opacity: 0,
    },
  };

  return (
    <Box
      as={motion.div}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      display={'flex'}
      {...props}
    >
      {children}
    </Box>
  );
}
export default FadeIn;
