import { Flex, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import Type from './Type';
import Messages from './Messages';

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: 'computer', text: 'Hi, My Name is HoneyChat' },
    { from: 'me', text: 'Hey there' },
    { from: 'me', text: 'Myself Ferin Patel' },
    {
      from: 'computer',
      text: "Nice to meet you. You can send me message and i'll reply you with same message.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
    const data = inputMessage;

    setMessages(old => [...old, { from: 'me', text: data }]);
    setInputMessage('');

    setTimeout(() => {
      setMessages(old => [...old, { from: 'computer', text: data }]);
    }, 1000);
  };

  return (
    <Flex w={'100%'} h="90%" flexDir="column">
      <Divider />
      <Messages messages={messages} />
      <Divider />
      <Type
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
      />
    </Flex>
  );
};

export default Chat;
