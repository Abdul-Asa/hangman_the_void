import React, { useState, useEffect } from 'react';
import theme from './Theme';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Spinner from './components/Elements/Spinner';
import { BrowserRouter } from 'react-router-dom';
import RoutesJs from './routes/RouteList';
import { AnimatePresence } from 'framer-motion';
// import useSound from 'use-sound';
// import audio from './components/Sounds/audio.mp3';

function App() {
  const [loading, setLoading] = useState(false);
  // const [sound, setSound] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5700);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {loading === false ? (
        <AnimatePresence exitBeforeEnter initial={true}>
          <Box h={'100vh'} textAlign="center">
            <BrowserRouter>
              <RoutesJs />
            </BrowserRouter>
            {/* {page == 0 && <Welcome func={func1} />}
        {page == 1 && <NameInput func={func2} />} */}
          </Box>{' '}
        </AnimatePresence>
      ) : (
        <Spinner />
      )}
    </ChakraProvider>
  );
}

export default App;
