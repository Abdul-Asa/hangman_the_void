import { Box, Button, keyframes, Link, useMediaQuery } from '@chakra-ui/react';
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
{
  /* <style>
  .pushable {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .front {
    display: block;
    position: relative;
    padding: 12px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    color: white;
    background: hsl(345deg 100% 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
  }
  .pushable:hover {
    filter: brightness(110%);
  }
  .pushable:hover .front {
    transform: translateY(-6px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }
  .pushable:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }
  .pushable:hover .shadow {
    transform: translateY(4px);
    transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
  }
  .pushable:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }
  .pushable:focus:not(:focus-visible) {
    outline: none;
  }
</style>
<button class="pushable">
  <span class="shadow"></span>
  <span class="edge"></span>
  <span class="front">
    Push me
  </span> */
}
