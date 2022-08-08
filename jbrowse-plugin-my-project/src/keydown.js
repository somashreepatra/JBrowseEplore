import React from 'react';
import useKeyDown from './useKeyDown';

const KeyDown = () => {
  const [x, y] = useKeyDown();
  return (
    <h1>
      The key is ({x}, {y}): from plugin
    </h1>
  );
};

export default KeyDown;
