import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';
import './gradient.css';

const HelpText = ({ ...props }) => {
  return (
    <Text
      bgGradient={useColorModeValue(
        'linear(to-r, transparent, black, transparent )',
        'linear(to-r, transparent, #bdd4e7, transparent )'
      )}
      bgClip={'text'}
      fontSize={['sm', 'md']}
      className="gradient"
      px="2"
      {...props}
    >
      {props.children}
    </Text>
  );
};

export default HelpText;
