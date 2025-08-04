// import React, { useState, useEffect } from 'react';
// import {
//   Stack,
//   Link,
//   useColorModeValue,
//   Text,
//   useDisclosure,
//   Modal,
//   ModalHeader,
//   Button,
//   ModalOverlay,
//   ModalContent,
//   IconButton,
//   Flex,
// } from '@chakra-ui/react';
// import SlideUp from '../components/Animations/SlideUp';
// import { motion } from 'framer-motion';
// import Drop from '../components/Animations/Drop';
// import AnimatedHeading from '../components/Elements/AnimatedHeading';
// import FadeIn from '../components/Animations/FadeIn';
// import { TypeStage } from '../components/Elements/TypeArea';
// import { FaArrowLeft } from 'react-icons/fa';
// import { InputArea } from '../components/Elements/InputArea';
// import CountUp from 'react-countup';
// import Chat from '../components/Chat/Chat';

// const OnlineCanvas = ({
//   callback,
//   opp,
//   score,
//   oppScores,
//   updateGame,
//   setScore,
//   line,
//   setLine,
//   Answers,
// }) => {
//   const [level, setLevel] = useState(0);
//   const [current, setCurrent] = useState(Answers.Ideas[level]);
//   const [complete, setComplete] = useState(false);
//   const [correct, setCorrect] = useState(
//     Array(current.word.length).fill(false)
//   );
//   const [confam, setConfam] = useState('');
//   const [start, setStart] = useState(false);
//   const [begin, setBegin] = useState(0);
//   const { onClose } = useDisclosure();
//   const [done, setDone] = useState(false);
//   const [uSure, setSure] = useState(false);
//   const [count, setCount] = useState(7);
//   const [timer, setTimer] = useState(20);
//   const [modal, setModal] = useState(false);
//   const [watch, setWatch] = useState(4);

//   const user = JSON.parse(localStorage.getItem('userName'));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCount(count - 1);
//     }, 1000);
//     if (count === 0) {
//       clearInterval(interval);
//       setStart(true);
//     }
//     return () => clearInterval(interval);
//   }, [count]);

//   useEffect(() => {
//     if (line === true) {
//       const interval = setInterval(() => {
//         setWatch(watch - 1);
//       }, 1000);
//       if (watch === 0) {
//         nextLevel();
//         setCount(7);
//         setSure(false);
//         setTimer(20);
//         setStart(false);
//         clearInterval(interval);
//         setLine(false);
//         setWatch(4);
//       }
//       return () => clearInterval(interval);
//     }

//     return () => {};
//   }, [watch, line]);

//   useEffect(() => {
//     if (start) {
//       const interval = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//       if (timer === 0) {
//         updateGame();
//         clearInterval(interval);
//         setSure(true);
//       }
//       return () => clearInterval(interval);
//     }
//   }, [timer, start]);

//   const nextLevel = () => {
//     setBegin(score);
//     onClose();
//     setComplete(false);
//     if (level < Answers.Ideas.length - 1) {
//       setLevel(level + 1);
//     } else {
//       setDone(true);
//     }
//     setConfam('');
//   };
//   const check = e => {
//     const { value } = e.target;
//     for (let x = 0; x < current.word.length; x++) {
//       if (current.word[x] === ' ') {
//         setCorrect(inp => {
//           return [
//             ...inp.slice(0, x),
//             true,
//             ...inp.slice(x + 1, current.word.length),
//           ];
//         });
//       }
//     }

//     for (let x = 0; x < current.word.length; x++) {
//       if (value === current.word[x]) {
//         if (!correct[x] === true) {
//           setScore(score + 100);
//         }
//       }
//     }

//     if (current.word.includes(value)) {
//       setConfam('Correct ✅');
//       for (let x = 0; x < current.word.length; x++) {
//         if (value === current.word[x]) {
//           setCorrect(inp => {
//             return [
//               ...inp.slice(0, x),
//               true,
//               ...inp.slice(x + 1, current.word.length),
//             ];
//           });
//         }
//       }
//     } else {
//       setScore(score - 80);
//       setConfam('Wrong ❌');
//     }
//     if (!correct.includes(false)) {
//       setComplete(true);
//     }
//   };

//   useEffect(() => {
//     if (Answers.Ideas[level]) {
//       setCurrent(Answers.Ideas[level]);
//     }
//     return () => {};
//   }, [level, Answers]);

//   useEffect(() => {
//     setCorrect(Array(current.word.length).fill(false));
//     return () => {};
//   }, [current.word.length]);

//   useEffect(() => {
//     if (!correct.includes(false)) {
//       setComplete(true);
//     }
//     return () => {};
//   }, [correct]);

//   const ReturnButton = ({ ...props }) => {
//     return (
//       <IconButton
//         bgGradient="linear(to-r, brand.2, brand.1)"
//         _hover={{
//           bgGradient: 'linear(to-r, red.500, yellow.500)',
//         }}
//         _focus={{
//           bg: 'transparent',
//           bgGradient: 'linear(to-r, brand.2, brand.1)',
//           bgClip: 'text',
//           border: '1px',
//         }}
//         size="sm"
//         fontSize="lg"
//         aria-label={`Go back`}
//         variant="ghost"
//         color="white"
//         marginLeft="2"
//         icon={<FaArrowLeft />}
//         {...props}
//       />
//     );
//   };

//   return (
//     <>
//       <Modal
//         closeOnOverlayClick={false}
//         isOpen={uSure}
//         onClose={onClose}
//         motionPreset="slideInBottom"
//         scrollBehavior={'inside'}
//       >
//         <ModalOverlay
//           bg="blackAlpha.300"
//           backdropFilter="blur(2px) hue-rotate(-15deg)"
//         />
//         <ModalContent
//           maxH={'500px'}
//           bgColor="white"
//           overflow={'auto'}
//           overflowY="auto"
//           as={motion.div}
//           drag
//           dragConstraints={{
//             top: -10,
//             left: -50,
//             right: 50,
//             bottom: 10,
//           }}
//         >
//           {done ? (
//             <>
//               <Chat />
//               <Flex p="5%" justify={'space-around'}>
//                 <Button
//                   as={motion.button}
//                   alignItems="center"
//                   color="white"
//                   fontWeight="bold"
//                   borderRadius="md"
//                   w="40%"
//                   bgGradient="linear(to-r, brand.2, brand.1)"
//                   _hover={{
//                     bgGradient: 'linear(to-r, red.500, yellow.500)',
//                   }}
//                   _focus={{
//                     bgGradient: 'linear(to-r, brand.2, brand.1)',
//                     bgClip: 'text',
//                     border: '1px solid black',
//                   }}
//                   onClick={() => {
//                     setSure(false);
//                     nextLevel();
//                     setTimer(20);
//                     setCount(7);
//                     setStart(false);
//                   }}
//                 >
//                   Rematch
//                 </Button>
//                 <Button
//                   as={motion.button}
//                   alignItems="center"
//                   color="white"
//                   fontWeight="bold"
//                   borderRadius="md"
//                   w="40%"
//                   bgGradient="linear(to-r, brand.2, brand.1)"
//                   _hover={{
//                     bgGradient: 'linear(to-r, red.500, yellow.500)',
//                   }}
//                   _focus={{
//                     bgGradient: 'linear(to-r, brand.2, brand.1)',
//                     bgClip: 'text',
//                     border: '1px solid black',
//                   }}
//                   onClick={() => {
//                     setSure(false);
//                     setDone(false);
//                   }}
//                 >
//                   Quit
//                 </Button>
//               </Flex>
//             </>
//           ) : (
//             <Stack
//               p={2}
//               align="center"
//               h={'270px'}
//               bgColor="white"
//               rounded="md"
//               overscroll={'contain'}
//             >
//               <ModalHeader color={'black'}>
//                 Round {level + 1} complete! 🎉
//               </ModalHeader>
//               <AnimatedHeading pb={4}>
//                 Your Score: <CountUp start={begin} end={score} />
//               </AnimatedHeading>
//               <AnimatedHeading pb={4}>
//                 {opp.oppName}'s Score: <CountUp start={begin} end={oppScores} />
//               </AnimatedHeading>

//               <Button
//                 autoFocus={false}
//                 as={motion.button}
//                 alignItems="center"
//                 color="white"
//                 fontWeight="bold"
//                 borderRadius="md"
//                 w="40%"
//                 bgGradient="linear(to-r, brand.2, brand.1)"
//                 _hover={{
//                   bgGradient: 'linear(to-r, red.500, yellow.500)',
//                 }}
//                 _focus={{
//                   bgGradient: 'linear(to-r, brand.2, brand.1)',
//                   bgClip: 'text',
//                   border: '1px solid black',
//                 }}
//                 isLoading={!line}
//               >
//                 {watch}
//               </Button>
//             </Stack>
//           )}
//         </ModalContent>
//       </Modal>
//       <Drop p={['8', '20']} align="center">
//         <ReturnButton onClick={() => setModal(true)} />
//         <AnimatedHeading fontSize={['14px', '28px']}>
//           {/* {user} vs {opp.oppName} */}ABU vs ASA
//         </AnimatedHeading>
//         <AnimatedHeading fontSize={['14px', '28px']}>
//           Score: {score}
//         </AnimatedHeading>
//         <AnimatedHeading fontSize={['14px', '28px']}>
//           Time: {timer}
//         </AnimatedHeading>
//       </Drop>
//       <Stack align={'center'}>
//         <FadeIn color={useColorModeValue('brand.3', 'brand.4')}>
//           <InputArea
//             current={current}
//             correct={correct}
//             borderColor={useColorModeValue('brand.3', 'brand.4')}
//           />
//         </FadeIn>
//         <SlideUp>
//           {' '}
//           <Text
//             color={useColorModeValue('brand.3', 'brand.4')}
//             pb={4}
//             fontSize={['sm', 'medium']}
//             onClick={nextLevel}
//           >
//             {start ? 'Hint: ' + current.hint : '   starting in: ' + count}
//           </Text>
//         </SlideUp>
//         <Text
//           borderColor={useColorModeValue('brand.3', 'brand.4')}
//           pb={`10`}
//           h={'20px'}
//           visibility={confam ? '' : 'hidden'}
//         >
//           {complete ? 'Complete 💖' : confam}
//         </Text>
//         <FadeIn>
//           <TypeStage func={check} disabled={!begin} />
//         </FadeIn>
//         <SlideUp
//           align={'center'}
//           color={useColorModeValue('brand.3', 'brand.4')}
//           pt={[200]}
//           fontSize={['xs', 'sm']}
//         >
//           Made with ❤️ by {'\u00a0'}
//           <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
//             Shehu
//           </Link>
//         </SlideUp>
//       </Stack>
//       <Modal
//         closeOnOverlayClick={false}
//         isOpen={modal}
//         onClose={onClose}
//         motionPreset="slideInBottom"
//         scrollBehavior={'inside'}
//       >
//         <ModalOverlay
//           bg="blackAlpha.300"
//           backdropFilter="blur(2px) hue-rotate(-15deg)"
//         />
//         <ModalContent
//           maxH={'500px'}
//           bgColor="white"
//           overflow={'auto'}
//           overflowY="auto"
//           as={motion.div}
//           drag
//           dragConstraints={{
//             top: -10,
//             left: -50,
//             right: 50,
//             bottom: 10,
//           }}
//         >
//           <Stack
//             p={2}
//             align="center"
//             h={'270px'}
//             bgColor="white"
//             rounded="md"
//             overscroll={'contain'}
//           >
//             <ModalHeader color={'black'}>
//               Are you sure you want to quit?{' '}
//             </ModalHeader>

//             <Button
//               autoFocus={false}
//               as={motion.button}
//               alignItems="center"
//               color="white"
//               fontWeight="bold"
//               borderRadius="md"
//               w="40%"
//               bgGradient="linear(to-r, brand.2, brand.1)"
//               _hover={{
//                 bgGradient: 'linear(to-r, red.500, yellow.500)',
//               }}
//               _focus={{
//                 bgGradient: 'linear(to-r, brand.2, brand.1)',
//                 bgClip: 'text',
//                 border: '1px solid black',
//               }}
//               onClick={() => {
//                 callback();
//               }}
//             >
//               Quit
//             </Button>
//             <Button
//               autoFocus={false}
//               as={motion.button}
//               alignItems="center"
//               color="white"
//               fontWeight="bold"
//               borderRadius="md"
//               w="40%"
//               bgGradient="linear(to-r, brand.2, brand.1)"
//               _hover={{
//                 bgGradient: 'linear(to-r, red.500, yellow.500)',
//               }}
//               _focus={{
//                 bgGradient: 'linear(to-r, brand.2, brand.1)',
//                 bgClip: 'text',
//                 border: '1px solid black',
//               }}
//               onClick={() => {
//                 setModal(false);
//               }}
//             >
//               Cancel
//             </Button>
//           </Stack>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default OnlineCanvas;

// // import React, { useState, useEffect } from 'react';
// // import {
// //   Stack,
// //   Link,
// //   Flex,
// //   Button,
// //   Text,
// //   Modal,
// //   Spinner,
// //   ModalOverlay,
// //   ModalContent,
// //   useDisclosure,
// // } from '@chakra-ui/react';
// // import { motion } from 'framer-motion';
// // import SlideUp from '../components/Animations/SlideUp';
// // import WelcomeDiv from '../components/Elements/WelcomeDiv';
// // import Drop from '../components/Animations/Drop';
// // import AnimatedHeading from '../components/Elements/AnimatedHeading';
// // import { BackButton } from '../components/Elements/BackButton';
// // import FadeIn from '../components/Animations/FadeIn';
// // import { w3cwebsocket as W3CWebSocket } from 'websocket';
// // // import { useNavigate, Routes, Route } from 'react-router-dom';
// // import OnlineCanvas from './OnlineCanvas';

// // const PlayGround = () => {
// //   const HOST =
// //     process.env.NODE_ENV === 'development'
// //       ? 'ws://127.0.0.1:8000'
// //       : 'wss://hangman-websocket.herokuapp.com/';
// //   const client = new W3CWebSocket(HOST);
// //   const user = JSON.parse(localStorage.getItem('userName'));
// //   const [lobby, setLobby] = useState([]);
// //   const [userId, setId] = useState();
// //   const [opp, setOpp] = useState('');
// //   const { onClose } = useDisclosure();
// //   const [uSure, setSure] = useState(false);
// //   const [yay, setYay] = useState(false);
// //   const [match, setMatch] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [gameId, setGame] = useState();
// //   const [score, setScore] = useState(0);
// //   const [oppScores, setOppscores] = useState(0);
// //   const [line, setLine] = useState(false);
// //   const [round, setRound] = useState(1);
// //   const [quit, setQuit] = useState(false);
// //   const [Answers, setAnswer] = useState();
// //   // let navigate = useNavigate();

// //   useEffect(() => {
// //     client.onopen = () => {
// //       console.log('Connecting to the server...');
// //     };
// //     client.onmessage = message => {
// //       const results = JSON.parse(message.data);
// //       if (results.method === 'connect') {
// //         setId(results.clientId);
// //         const payLoad = {
// //           method: 'connected',
// //           clientId: userId,
// //           userName: user,
// //         };
// //         client.send(JSON.stringify(payLoad));
// //       }
// //       if (results.method === 'online') {
// //         console.log('successfully connected');
// //         setLobby(results.lobby);
// //       }
// //       if (results.method === 'inviteGame') {
// //         if (gameId) {
// //           const payLoad = {
// //             method: 'inaMatch',
// //             clientId: userId,
// //             clientName: user,
// //           };
// //           client.send(JSON.stringify(payLoad));
// //         } else {
// //           setSure(false);
// //           setYay(true);
// //           setOpp({ oppName: results.oppName, oppId: results.oppId });
// //           setGame(results.gameId);
// //           setAnswer(results.questions);
// //         }
// //       }
// //       if (results.method === 'inv') {
// //         console.log(results);
// //         setOpp({ oppName: results.oppName, oppId: results.oppId });
// //         setGame(results.gameId);
// //         setAnswer(results.questions);
// //       }
// //       if (results.method === 'lol') {
// //         setSure(true);
// //         setMessage('Your request was rejected. Loser😝');
// //         setOpp('');
// //         setGame('');
// //         console.log(results);
// //       }
// //       if (results.method === 'accepted') {
// //         setSure(false);
// //         setMatch(true);
// //       }
// //       if (results.method === 'play') {
// //         setOppscores(results.oppScores);
// //         setLine(true);
// //       }
// //       if (results.method === 'endMatch') {
// //         setQuit(true);
// //         setOpp('');
// //         setGame('');
// //       }
// //     };
// //     return () => {
// //       client.close();
// //     };
// //   }, []);
// //   const logOut = () => {
// //     const payLoad = {
// //       method: 'disconnected',
// //       clientId: userId,
// //       userName: user,
// //     };
// //     client.send(JSON.stringify(payLoad));
// //     console.log('Disconnected');
// //     client.close();
// //   };
// // const startGame = e => {
// //   const { value, name } = e.target;
// //   const payLoad = {
// //     method: 'createGame',
// //     clientId: userId,
// //     clientName: user,
// //     oppId: value,
// //     oppName: name,
// //   };
// //   client.send(JSON.stringify(payLoad));
// // };
// //   const acceptInvite = () => {
// //     const payLoad = {
// //       method: 'accepted',
// //       clientId: userId,
// //       clientName: user,
// //       oppId: opp.oppId,
// //       oppName: opp.oppName,
// //       gameId: gameId,
// //     };
// //     client.send(JSON.stringify(payLoad));
// //   };
// //   const rejectInvite = () => {
// //     const payLoad = {
// //       method: 'rejected',
// //       clientId: userId,
// //       clientName: user,
// //       oppId: opp.oppId,
// //       oppName: opp.oppName,
// //       gameId: gameId,
// //     };
// //     client.send(JSON.stringify(payLoad));
// //     console.log(payLoad);
// //   };

// //   const updateGameState = () => {
// //     const payLoad = {
// //       method: 'play',
// //       clientId: userId,
// //       clientName: user,
// //       oppId: opp.oppId,
// //       oppName: opp.oppName,
// //       gameId: gameId,
// //       score: score,
// //       round: round,
// //     };
// //     client.send(JSON.stringify(payLoad));
// //     setRound(round + 1);
// //   };
// //   const endMatch = () => {
// //     const payLoad = {
// //       method: 'endMatch',
// //       clientId: userId,
// //       clientName: user,
// //       oppId: opp.oppId,
// //       oppName: opp.oppName,
// //       gameId: gameId,
// //     };
// //     client.send(JSON.stringify(payLoad));
// //   };
// //   const callback = () => {
// //     setMatch(false);
// //     endMatch();
// //   };
// //   return !match ? (
// //     <>
// //       <Modal
// //         closeOnOverlayClick={false}
// //         isOpen={uSure}
// //         onClose={onClose}
// //         motionPreset="slideInBottom"
// //       >
// //         <ModalOverlay
// //           bg="blackAlpha.300"
// //           backdropFilter="blur(2px) hue-rotate(-15deg)"
// //         />
// //         <ModalContent
// //           bgColor="white"
// //           as={motion.div}
// //           drag
// //           dragConstraints={{
// //             top: -10,
// //             left: -50,
// //             right: 50,
// //             bottom: 10,
// //           }}
// //         >
// //           <Stack
// //             p={2}
// //             align="center"
// //             bgColor="white"
// //             color={'black'}
// //             rounded="md"
// //           >
// //             <>
// //               {message ? (
// //                 <Text fontWeight={'bold'} fontSize="20px">
// //                   {message}
// //                 </Text>
// //               ) : (
// //                 <AnimatedHeading pb={4}>
// //                   Waiting for response...
// //                 </AnimatedHeading>
// //               )}
// //               {!message && <Spinner color="black" />}
// //               <Button
// //                 alignItems="center"
// //                 color="white"
// //                 fontWeight="bold"
// //                 borderRadius="md"
// //                 w="40%"
// //                 bgGradient="linear(to-r, brand.2, brand.1)"
// //                 _hover={{
// //                   bgGradient: 'linear(to-r, red.500, yellow.500)',
// //                 }}
// //                 _focus={{
// //                   bgGradient: 'linear(to-r, brand.2, brand.1)',
// //                   bgClip: 'text',
// //                   border: '1px solid black',
// //                 }}
// //                 onClick={
// //                   message
// //                     ? () => {
// //                         setSure(false);
// //                         setMessage('');
// //                         setGame('');
// //                       }
// //                     : () => {
// //                         setSure(false);
// //                       }
// //                 }
// //               >
// //                 Cancel
// //               </Button>
// //             </>
// //           </Stack>
// //         </ModalContent>
// //       </Modal>
// //       <Drop p={['8', '20']} align="center">
// //         <BackButton func={logOut} />
// //       </Drop>

// //       <Modal
// //         closeOnOverlayClick={false}
// //         isOpen={yay}
// //         onClose={onClose}
// //         motionPreset="slideInBottom"
// //       >
// //         <ModalOverlay
// //           bg="blackAlpha.300"
// //           backdropFilter="blur(2px) hue-rotate(-15deg)"
// //         />
// //         <ModalContent
// //           bgColor="white"
// //           as={motion.div}
// //           drag
// //           dragConstraints={{
// //             top: -10,
// //             left: -50,
// //             right: 50,
// //             bottom: 10,
// //           }}
// //         >
// //           <Stack
// //             p={2}
// //             align="center"
// //             bgColor="white"
// //             rounded="md"
// //             textAlign={'center'}
// //           >
// //             <AnimatedHeading pb={4}>
// //               {opp.oppName} invites you to a match
// //             </AnimatedHeading>
// //             <Button
// //               autoFocus={false}
// //               alignItems="center"
// //               color="white"
// //               fontWeight="bold"
// //               borderRadius="md"
// //               w="40%"
// //               bgGradient="linear(to-r, brand.2, brand.1)"
// //               _hover={{
// //                 bgGradient: 'linear(to-r, red.500, yellow.500)',
// //               }}
// //               _focus={{
// //                 bgGradient: 'linear(to-r, brand.2, brand.1)',
// //                 bgClip: 'text',
// //                 border: '1px solid black',
// //               }}
// //               onClick={() => {
// //                 setYay(false);
// //                 acceptInvite();
// //                 setMatch(true);
// //               }}
// //             >
// //               Accept
// //             </Button>
// //             <Button
// //               color={'black'}
// //               borderRadius="md"
// //               w="40%"
// //               border={'1px solid black'}
// //               onClick={() => {
// //                 setYay(false);
// //                 rejectInvite();
// //                 setGame('');
// //               }}
// //               mb="8px"
// //             >
// //               Decline
// //             </Button>
// //           </Stack>
// // //         </ModalContent>
// // //       </Modal>
// //     </>
// //   ) : (
// //     <>
// //       <OnlineCanvas
// //         callback={callback}
// //         userId={userId}
// //         opp={opp}
// //         gameId={gameId}
// //         updateGame={updateGameState}
// //         score={score}
// //         setScore={setScore}
// //         oppScores={oppScores}
// //         line={line}
// //         setLine={setLine}
// //         Answers={Answers}
// //       />{' '}
// //       <Modal
// //         closeOnOverlayClick={false}
// //         isOpen={quit}
// //         onClose={onClose}
// //         motionPreset="slideInBottom"
// //       >
// //         <ModalOverlay
// //           bg="blackAlpha.300"
// //           backdropFilter="blur(2px) hue-rotate(-15deg)"
// //         />
// //         <ModalContent
// //           bgColor="white"
// //           as={motion.div}
// //           drag
// //           dragConstraints={{
// //             top: -10,
// //             left: -50,
// //             right: 50,
// //             bottom: 10,
// //           }}
// //         >
// //           <Stack
// //             p={2}
// //             align="center"
// //             bgColor="white"
// //             color={'black'}
// //             rounded="md"
// //           >
// //             <>
// //               <AnimatedHeading pb={4}>Opponent quit</AnimatedHeading>
// //               <Button
// //                 alignItems="center"
// //                 color="white"
// //                 fontWeight="bold"
// //                 borderRadius="md"
// //                 w="40%"
// //                 bgGradient="linear(to-r, brand.2, brand.1)"
// //                 _hover={{
// //                   bgGradient: 'linear(to-r, red.500, yellow.500)',
// //                 }}
// //                 _focus={{
// //                   bgGradient: 'linear(to-r, brand.2, brand.1)',
// //                   bgClip: 'text',
// //                   border: '1px solid black',
// //                 }}
// //                 onClick={() => {
// //                   setSure(false);
// //                   setMessage('');
// //                   setMatch(false);
// //                   setQuit(false);
// //                 }}
// //               >
// //                 Back to Menu
// //               </Button>
// //             </>
// //           </Stack>
// //         </ModalContent>
// //       </Modal>{' '}
// //     </>
// //   );
// // };

// // export default PlayGround;
