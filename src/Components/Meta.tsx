import React, { useState } from "react";

import { useRef } from "react";
import { useEffect } from "react";
// import { metaGlobal } from "../../MetaComponents/metaGlobal";
import { myCrib } from "./crib";




let world: myCrib;
export default function Meta() {
  const canvasRef = useRef<HTMLCanvasElement>(null);



  useEffect(() => {
    world = new myCrib(
      canvasRef.current!,
    );

    return () => {
      world && world.terminateMetaverse();
      world = {} as myCrib;
    };
  },[]);
  return (
   
      <canvas style={{    width: '100%', height: '100%'}} ref={canvasRef} />
    
  );
}
