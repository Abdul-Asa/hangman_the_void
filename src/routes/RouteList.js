import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import NameInput from '../pages/NameInput';
import Home from '../pages/Home';
import Canvas from '../pages/Canvas';
import HighScore from '../pages/HighScore';
import PlayGround from '../pages/PlayGround';
import Help from '../pages/Help';

const RoutesJs = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Welcome />}></Route>
      <Route exact path="/entry/*" element={<NameInput />}></Route>
      <Route exact path="/home/*" element={<Home />}></Route>
      <Route exact path="/canvas/*" element={<Canvas />}></Route>
      <Route exact path="/playground/*" element={<PlayGround />}></Route>
      <Route exact path="/options/*" element={<Help />}></Route>
      <Route exact path="/hi-scores/*" element={<HighScore />}></Route>
    </Routes>
  );
};

export default RoutesJs;
