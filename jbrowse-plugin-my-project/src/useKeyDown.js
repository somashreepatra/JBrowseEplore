import { useState, useEffect } from "react";

const useKeyDown = () => {
  const [coords, setCoords] = useState([0, 0]);

  useEffect(() => {
    const handler = (props) => {
      console.log("KEY PRESS HANDLER ", props);
      if(['a', 't', 'g', 'c' ].includes(props.key?.toLowerCase())) {
        setCoords([props.key.toLowerCase(), props.keyCode])
      }
    };
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
  return coords;
};

export default useKeyDown;
