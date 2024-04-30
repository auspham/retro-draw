import {useFireBase} from "./useFireBase.tsx";
import { getFirestore, Firestore } from 'firebase/firestore';

export const useFirestore = (): Firestore => {
  const app = useFireBase();
  return getFirestore(app);
}
