import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import useSound from 'use-sound';
import stretch from '../Sounds/stretch.mp3';
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

const ColorModeSwitcher = ({ menu, sound }) => {
  const { toggleColorMode } = useColorMode();
  const x = useMotionValue(0);
  const [play1, { stop }] = useSound(stretch, {
    sprite: { pew: [500, 2000] },
    interrupt: true,
    soundEnabled: sound,
  });

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        drag={!menu && 'y'}
        dragSnapToOrigin
        dragElastic={{ top: 0, bottom: 0.3 }}
        dragConstraints={{ top: 0, bottom: 0 }}
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onDragStart={() => {
          play1({ id: 'pew' });
        }}
        onDragEnd={() => {
          stop();
          toggleColorMode();
        }}

        // onHoverStart={}
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
          aria-label="Toggle theme"
          icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
          onClick={toggleColorMode}
        ></IconButton>
      </motion.div>
    </AnimatePresence>
  );
};
export default ColorModeSwitcher;
