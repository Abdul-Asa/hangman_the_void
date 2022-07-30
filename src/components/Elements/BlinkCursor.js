// import React from 'react';
// import {
//   Heading,
//   Center,
//   Stack,
//   Input,
//   InputGroup,
//   InputRightAddon,
//   Flex,
//   keyframes,
//   Box,
// } from '@chakra-ui/react';
// import { motion } from 'framer-motion';
// import ReactTypingEffect from 'react-typing-effect';

// export const BlinkCursor = () => {
//   const animationKeyframes = keyframes`
//   0% { transform: scale(1); opacity(0) }
//   25% { transform: scale(1.2); opacity(1) }
//   50% { transform: scale(1); opacity(0) }
//   75% { transform: scale(1.2); opacity(1) }
//   100% { transform: scale(1); opacity(0) }
// `;

//   const animation = `${animationKeyframes} 2s ease-in-out infinite`;
//   return (
//     <Box
//       as={motion.div}
//       // // animation={animation}
//       // // bgColor={'white'}
//       // w="1px"
//       // height="14"
//       display="flex"
//     >
//       <ReactTypingEffect cursorRenderer={cursor => <h1>{cursor}</h1>} />
//     </Box>
//   );
// };
