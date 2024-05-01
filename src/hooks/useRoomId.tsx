import {createContext, useContext} from "react";


export const RoomContext = createContext<string>(undefined)

export const useRoomId = () => {
  return useContext(RoomContext);
}