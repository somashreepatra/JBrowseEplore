import { useState, useEffect } from "react";
import { BaseOperationEnum } from "./TraceRenderer/components/ITrace";

const useKeyDown = () => {
  const [coords, setCoords] = useState([0, 0, BaseOperationEnum.NONE])
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
        console.log("UPDATE");
        setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.UPDATE])
      } else if(['Backspace'].includes(props.key)) {
        // setCoords({
        //   key: 0,
        //   keyCode: 0,
        //   operation: BaseOperationEnum.DELETE
        // })
        console.log("DELETE");
        setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.DELETE])
      } else if(['Enter'].includes(props.key)) {
        let base = document.getElementById('add_base_ce').value;
        setCoords([base, props.keyCode, BaseOperationEnum.ADD])
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
