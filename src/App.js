import React from 'react';
import theme from './Theme';
import { ChakraProvider, Box } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './component/ColorModeSwitcher';
// import { Logo } from './Logo';

// import Welcome from './pages/Welcome';
// import NameInput from './pages/NameInput';
import { BrowserRouter } from 'react-router-dom';
import RoutesJs from './routes/RouteList';
import { AnimatePresence } from 'framer-motion';
function App() {
  // const [page, setPage] = useState(0);
  // const func1 = () => {
  //   setPage(page + 1);
  // };
  // const func2 = () => {
  //   setPage(page - 1);
  // };
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence exitBeforeEnter initial={true}>
        <Box h={'100vh'} textAlign="center">
          <BrowserRouter>
            <RoutesJs />
          </BrowserRouter>
          {/* {page == 0 && <Welcome func={func1} />}
        {page == 1 && <NameInput func={func2} />} */}
        </Box>{' '}
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default App;
