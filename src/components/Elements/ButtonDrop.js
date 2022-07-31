import { Button, useMediaQuery } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './click.css';
function ButtonDrop({ ...props }) {
  let navigate = useNavigate();
  const [isDesktop] = useMediaQuery('(min-width: 50em)');
  return isDesktop ? (
    <motion.button
      className="pushable"
      // alignItems="center"
      // color="white"
      // fontWeight="bold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      // borderRadius="md"
      initial={{ opacity: 0, scale: 0.5, width: '30%' }}
      animate={{ x: [150, 0], opacity: 1, scale: 1, width: '50%' }}
      transition="1.5s ease-out "
      // bgGradient="linear(to-r, brand.2, brand.1)"
      // _hover={{
      //   bgGradient: 'linear(to-r, red.500, yellow.500)',
      // }}
      // _focus={{
      //   bg: 'transparent',
      //   bgGradient: 'linear(to-r, brand.2, brand.1)',
      //   bgClip: 'text',
      //   border: '1px',
      // }}
      onClick={() => {
        navigate(`/entry/`);
      }}
      // {...props}
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
        navigate(`/entry/`);
      }}
      {...props}
    >
      Let's Go!
    </Button>
  );
}
export default ButtonDrop;
