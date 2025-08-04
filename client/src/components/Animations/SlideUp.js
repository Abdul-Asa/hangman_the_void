import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function SlideUp({ children, ...props }) {
  const slide = {
    hidden: {
      y: '100vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.4,
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
      variants={slide}
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
export default SlideUp;
