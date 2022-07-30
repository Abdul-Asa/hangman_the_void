import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ ...props }) => {
  let navigate = useNavigate();

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
        props.type
          ? () => {
              navigate('/');
            }
          : () => {
              navigate(-1);
            }
      }
      icon={props.type ? <FaHome /> : <FaArrowLeft />}
      {...props}
    />
  );
};
