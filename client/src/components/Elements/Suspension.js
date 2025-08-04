import { Box, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function Suspension({ user, ...props }) {
  // const goUp = {
  //   hidden: {
  //     x: '0',
  //     y: '0',
  //     opacity: 0,
  //   },
  //   visible: {
  //     x: '-180',
  //     y: '-180',
  //     opacity: 1,
  //     transition: {
  //       duration: 0.1,
  //       type: 'spring',
  //       damping: 55,
  //       stiffness: 200,
  //     },
  //   },
  //   exit: {
  //     x: '-100vh',
  //     opacity: 0,
  //   },
  // };

  return (
    <Box
      as={motion.div}
      // variants={goUp}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={[
        {
          y: [20, 0],
          opacity: 1,
          scale: 1,
        },
        {
          y: [100, 0],
          opacity: 1,
          scale: 1,
        },
      ]}
      exit={{ opacity: 0, scale: 1 }}
      display={'flex'}
      transition="1s ease-out "
      {...props}
    >
      <Heading
        as={motion.h1}
        fontWeight={'bold'}
        initial={{ fontSize: ['16px', '30px'] }}
        animate={{
          fontSize: ['20px', '40px'],
        }}
        bgGradient="linear(to-l, #FCC201, #B78628)"
        bgClip="text"
      >
        {user}
      </Heading>
    </Box>
  );
}
export default Suspension;
