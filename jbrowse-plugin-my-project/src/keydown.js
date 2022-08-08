import React from 'react';
import useKeyDown from './useKeyDown';

const KeyDown = ({childToParent}) => {
  const [x, y] = useKeyDown();
  {childToParent([x,y])}
  return (
    <h1>
      The key is ({x}, {y}): from plugin
    </h1>
  );
};

export default KeyDown;
