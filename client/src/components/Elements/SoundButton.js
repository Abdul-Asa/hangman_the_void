import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { FaVolumeUp, FaVolumeOff } from 'react-icons/fa';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
// import useSound from 'use-sound';
// import Xboxsfx from '../Sounds/Xbox.mp3';

// export const MyComponent = () => {
//
//   return (
//     <motion.div style={{ background }}>
//       <motion.div
//         drag="x"
//         dragConstraints={{ left: 0, right: 0 }}
//         style={{ x }}
//       >
//         <IconButton x={x} />
//       </motion.div>
//     </motion.div>
//   );
// };

const SoundButton = ({ sound, callback }) => {
  // const [sound, setSound] = useState(true);
  const x = useMotionValue(0);
  const toggleSound = () => {
    callback();
  };
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={sound}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          as={motion.button}
          bgGradient={useColorModeValue(
            'linear(to-r, brand.1, brand.2)',
            'linear(to-r, red.500, yellow.500)'
          )}
          _hover={{
            bgGradient: useColorModeValue(
              'linear(to-r, red.500, yellow.500)',
              'linear(to-r, brand.1, brand.2)'
            ),
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          color={'white'}
          x={x}
          aria-label="Toggle sound"
          icon={sound ? <FaVolumeUp /> : <FaVolumeOff />}
          onClick={toggleSound}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};

export default SoundButton;
