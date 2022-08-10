import React from 'react';
import useKeyDown from './useKeyDown';

const KeyDown = ({childToParent, feature}) => {
  const [x, y] = useKeyDown();
  {childToParent([x,y])}
  console.log("FEATURE ", feature);
  return (
    <h1>
      The key is ({x}, {y}): from plugin
    
      <div>{feature}</div>
    </h1>
  );
};

export default KeyDown;
