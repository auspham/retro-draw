import React, {Dispatch} from "react";
import {DrawCanvas} from "../../components/DrawCanvas.tsx";

type DrawAvatarPageProp = {
  setDrawing: Dispatch<string>
  handleJoinRetro: () => void
  name: string,
  color: string
}
export const DrawAvatarPage: React.FC<DrawAvatarPageProp> = ({ name, setDrawing , handleJoinRetro, color }) => {
  return <div className={"p-4 container lock-screen"}>
    <h1 className={"is-size-4 mb-5"}><span className={"has-text-weight-bold has-text-primary"}>{name}</span>, try your
      best to draw yourself!</h1>

    <DrawCanvas saveImage={setDrawing} color={color}/>

    <button className="button is-fullwidth is-info" onClick={handleJoinRetro}>Continue</button>
  </div>
}