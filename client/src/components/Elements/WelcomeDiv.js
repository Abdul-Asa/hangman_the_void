import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function WelcomeDiv({ children, ...props }) {
  // const animationKeyframes = keyframes`
  //   0% { transform: scale(1) rotate(0); translate(50px, 100px); border-radius: 20%;  }
  //   25% { transform: scale(2) rotate(0); border-radius: 50%; }
  //   50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  //   75% { transform: scale(1) rotate(270deg); border-radius: 20%; }
  //   100% { transform: scale(1) rotate(0); border-radius: 20%; }
  // `;

  // const animation = `${animationKeyframes} 3s ease-in-out 1`;

  return (
    <Box
      as={motion.div}
      height="70px"
      initial={{ opacity: 0, scale: 1 }}
      animate={{ x: [null, -150, 0], opacity: 1, scale: 1.2 }}
      exit={{ opacity: 0, scale: 1 }}
      transition="1s ease-out "
      padding="2"
      display="flex"
      {...props}
      // onClick={()}
    >
      {children}
    </Box>
  );
}
export default WelcomeDiv;
