import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import DnDIcons from "./dndIcons.component";

export default function Square({ black, children }) {
  const fill = "white"; /*? "grey" : "white"*/
  const stroke = "black"; /*? "white" : "grey"*/
  // const [itemProp, setItemProp] = useState(props);
  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "20px",
        height: "20px",
        border: "rgba(40, 40, 40, 0.1) solid 1px",
      }}
    >
      {children}
    </div>
  );
}