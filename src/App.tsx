import {useEffect, useState} from "react";
import HostPage from "./pages/host";
import PlayerPage from "./pages/players";
import {useFirestore} from "./hooks/useFireStore.tsx";
import { doc, getDoc } from "firebase/firestore";

export const App = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const db = useFirestore()

  useEffect(() => {
    const params = new URL(String(document.location)).searchParams;
    const roomId = params.get("join");

    if (!roomId) return;

    getDoc(doc(db, "rooms", roomId)).then(docSnap => {
      if (docSnap.exists()) {
        setRoomId(roomId);
      }
    })

  }, []);

  return !roomId ? <HostPage/> : <PlayerPage roomId={roomId}/>
}