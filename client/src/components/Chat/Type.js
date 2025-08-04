import React from 'react';
import { Flex, Input, Button } from '@chakra-ui/react';

const Type = ({ inputMessage, setInputMessage, handleSendMessage }) => {
  return (
    <Flex w="100%" mt="5">
      <Input
        placeholder="Type Something..."
        _placeholder={{
          color: 'gray',
        }}
        border="1px solid"
        borderColor={'gold'}
        color={'black'}
        borderRadius="none"
        _focus={{
          border: '1px solid black',
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
      />

      <Button
        autoFocus={false}
        alignItems="center"
        color="white"
        fontWeight="bold"
        borderRadius="none"
        w="40%"
        bgGradient="linear(to-r, brand.2, brand.1)"
        _hover={{
          bgGradient: 'linear(to-r, red.500, yellow.500)',
        }}
        _focus={{
          bgGradient: 'linear(to-r, brand.2, brand.1)',
          bgClip: 'text',
          border: '1px solid black',
        }}
        bg="black"
        disabled={inputMessage.trim().length <= 0}
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </Flex>
  );
};

export default Type;
