import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import bye from '../Sounds/Xp.mp3';

export const BackButton = ({ sound, func, windows, ...props }) => {
  // const sound = JSON.parse(localStorage.getItem('sound'));

  let navigate = useNavigate();
  const [play] = useSound(bye, {
    seek: 1000,
    interrupt: true,
    soundEnabled: sound,
  });
  return (
    <IconButton
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
      size="sm"
      fontSize="lg"
      aria-label={`Go back`}
      variant="ghost"
      color="white"
      marginLeft="2"
      onClick={
        func
          ? () => {
              func();
              navigate(-1);
            }
          : props.type
          ? () => {
              if (windows) {
                play();
              }
              navigate('/');
            }
          : () => {
              if (windows) {
                play();
              }
              navigate(-1);
            }
      }
      icon={props.type ? <FaHome /> : <FaArrowLeft />}
      {...props}
    />
  );
};
