import React, { useState } from 'react';
import {
  Stack,
  Link,
  ListItem,
  OrderedList,
  useColorModeValue,
} from '@chakra-ui/react';
import SlideUp from '../components/Animations/SlideUp';
import WelcomeDiv from '../components/Elements/WelcomeDiv';
import { motion } from 'framer-motion';
import Drop from '../components/Animations/Drop';
import AnimatedHeading from '../components/Elements/AnimatedHeading';
import { BackButton } from '../components/Elements/BackButton';

const HighScore = () => {
  const hiScores = JSON.parse(localStorage.getItem('highScores'));
  // const icons = {
  //   1: <RiNumber1 />,
  //   2: <RiNumber2 />,
  //   3: <RiNumber3 />,
  //   4: <RiNumber4 />,
  //   5: <RiNumber5 />,
  // };
  return (
    <>
      <Drop p={['8', '20']} align="center">
        <BackButton />
      </Drop>
      <Stack align={'center'}>
        <WelcomeDiv>
          <AnimatedHeading fontSize={['22px', '40px']}>
            HighScores{' '}
          </AnimatedHeading>
        </WelcomeDiv>{' '}
        <AnimatedHeading fontSize={['16px', '26px']}>
          <OrderedList
            spacing={3}
            color={useColorModeValue('brand.3', 'brand.4')}
          >
            {hiScores.map((number, index) => {
              return (
                <ListItem
                  as={motion.li}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    y: [150, 0],
                    opacity: 1,
                    scale: [1.1, 1],
                  }}
                  transition={`${index + 1}.1s ease-out`}
                >
                  {number === 0 ? 'N/A' : number}
                </ListItem>
              );
            })}
          </OrderedList>{' '}
        </AnimatedHeading>
        <SlideUp
          align={'center'}
          color={useColorModeValue('brand.3', 'brand.4')}
          pt={[250, 180]}
          fontSize={['xs', 'sm']}
        >
          Made with ❤️ by {'\u00a0'}
          <Link href="https://twitter.com/AbdullahShehu1" target={'_blank'}>
            Shehu
          </Link>
        </SlideUp>
      </Stack>
    </>
  );
};

export default HighScore;
