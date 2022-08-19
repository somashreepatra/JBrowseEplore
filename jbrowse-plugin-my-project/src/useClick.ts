import { useState, useEffect } from "react";

export const useClick = (event: any) => {
  const [selectedBaseIndex, setSelectedBaseIndex] = useState(-1);

    //const clickHandler = (props: any) => {
      console.log("KEY PRESS HANDLER ", event?.target);
      setSelectedBaseIndex(25);
    //};
   
  return selectedBaseIndex;
};
