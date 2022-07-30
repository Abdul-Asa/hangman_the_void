import { Box, Button, keyframes, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function ButtonDrop({ ...props }) {
  let navigate = useNavigate();

  return (
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
