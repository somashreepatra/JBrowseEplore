import { useState, useEffect } from "react";
import { BaseOperationEnum } from "./TraceRenderer/components/ITrace";

const useKeyDown = () => {
  const [coords, setCoords] = useState([0, 0, false])
  // useState({
  //   operation: BaseOperationEnum.NONE,
  //   key: 0,
  //   keyCode: 0
  // });

  useEffect(() => {
    const handler = (props) => {
      console.log("KEY PRESS HANDLER ", props);
      if(['a', 't', 'g', 'c' ].includes(props.key?.toLowerCase())) {
        // setCoords({
        //   operation: BaseOperationEnum.UPDATE,
        //   key: props.key.toLowerCase(),
        //   keyCode: props.keyCode
        // })
        //setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.UPDATE])
        setCoords([props.key.toLowerCase(), props.keyCode, false])
      } else if(['Backspace'].includes(props.key)) {
        // setCoords({
        //   key: 0,
        //   keyCode: 0,
        //   operation: BaseOperationEnum.DELETE
        // })
        setCoords([props.key.toLowerCase(), props.keyCode, true])
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
