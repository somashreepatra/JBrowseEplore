import { useState, useEffect } from "react";

const useKeyDown = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const handler = (props) => {
      setCoords([props.key, props.keyCode])
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
  return coords;
};

export default useKeyDown;
