import { ADD } from "mobx/dist/internal";
import { useState, useEffect, useCallback } from "react";
import { BaseOperationEnum } from "./TraceRenderer/components/ITrace";

const useKeyDown = () => {
  const [coords, setCoords] = useState([0, 0, BaseOperationEnum.NONE])
  // useState({
  //   operation: BaseOperationEnum.NONE,
  //   key: 0,
  //   keyCode: 0
  // });

  const handler = useCallback(
    (props) => {
    console.log("KEY PRESS HANDLER ", props);
    if(props.target instanceof HTMLInputElement) { // Add a base
      setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.ADD])
    } else if(['a', 't', 'g', 'c' ].includes(props.key?.toLowerCase())) {  // Update a base
      // setCoords({
      //   operation: BaseOperationEnum.UPDATE,
      //   key: props.key.toLowerCase(),
      //   keyCode: props.keyCode
      // })
      //setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.UPDATE])
      console.log("UPDATE");
      setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.UPDATE])
    } else if(['Backspace'].includes(props.key)) {  // Delete a base
      // setCoords({
      //   key: 0,
      //   keyCode: 0,
      //   operation: BaseOperationEnum.DELETE
      // })
      console.log("DELETE");
      setCoords([props.key.toLowerCase(), props.keyCode, BaseOperationEnum.DELETE])
    } 
    props.stopPropagation();
    // else if(['Enter'].includes(props.key)) {
    //   let base = document.getElementById('add_base_ce').value;
    //   setCoords([base, props.keyCode, BaseOperationEnum.ADD])
    // }
  }, [setCoords, coords]
  );

  useEffect(() => {
    console.log('Add listner');
    window.removeEventListener('keydown', handler);
    window.addEventListener('keydown', handler);
    return () => {
      console.log('Delete Listner');
      window.removeEventListener('keydown', handler);
    };
  }, [handler]);
  return coords;
};

export default useKeyDown;
