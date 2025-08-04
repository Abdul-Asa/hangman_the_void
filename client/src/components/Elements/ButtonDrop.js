import { Button, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './click.css';
import useSound from 'use-sound';
import yahBoy from '../Sounds/Yaboy.mp3';
// import lesgo from '../Sounds/Lesgo.mp3';

function ButtonDrop({ sound, ...props }) {
  // const Sounds = {
  //   1: yahBoy,
  //   2: lesgo,
  // };
  // const sound = JSON.parse(localStorage.getItem('sound'));

  let navigate = useNavigate();
  const [isDesktop] = useMediaQuery('(min-width: 50em)');
  const [play1] = useSound(yahBoy, {
    sprite: { pew: [900, 1300] },
    interrupt: true,
    soundEnabled: sound,
  });
  // const [play2] = useSound(lesgo, {
  //   sprite: { pew: [1200, 1300] },
  //   interrupt: true,
  //   soundEnabled: true,
  // });
  return isDesktop ? (
    <motion.button
      className="pushable"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5, width: '30%' }}
      animate={{ x: [150, 0], opacity: 1, scale: 1, width: '50%' }}
      onClick={() => {
        play1({ id: 'pew' });
        navigate(`/entry/`);
      }}
    >
      <span className="shadow"></span>
      <span className="edge"></span>
      <span className="front">Lets Go!</span>
    </motion.button>
  ) : (
    <Button
      as={motion.button}
      alignItems="center"
      color="white"
      fontWeight="bold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      borderRadius="md"
      initial={{ opacity: 0, scale: 0.5, width: '30%' }}
      animate={{ x: [150, 0], opacity: 1, scale: 1, width: '50%' }}
      transition="1.5s ease-out "
      bgGradient="linear(to-r, brand.2, brand.1)"
      _hover={{
        bgGradient: 'linear(to-r, red.500, yellow.500)',
      }}
      _focus={{
        bg: 'transparent',
        bgGradient: 'linear(to-r, brand.2, brand.1)',
        bgClip: 'text',
        border: '1px',
      }}
      onClick={() => {
        play1({ id: 'pew' });
        navigate(`/entry/`);
      }}
      {...props}
    >
      Let's Go!
    </Button>
  );
}
export default ButtonDrop;
