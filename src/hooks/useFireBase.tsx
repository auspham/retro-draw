import {useContext} from "react";
import {FireBaseContext} from "../contexts/FireBaseContext.tsx";

export const useFireBase = () => {
  return useContext(FireBaseContext);
}