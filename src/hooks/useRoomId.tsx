import {createContext, useContext} from "react";


export const RoomContext = createContext<string>('')

export const useRoomId = () => {
  return useContext(RoomContext);
}