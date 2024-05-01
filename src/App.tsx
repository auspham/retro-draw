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

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';

      // Show a confirmation dialog
      const confirmationMessage = 'Are you sure you want to leave this page?';
      event.returnValue = confirmationMessage; // For legacy browsers

      return confirmationMessage; // For modern browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Cleanup: Remove the event listener when the component is unmounted
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);

  return !roomId ? <HostPage/> : <PlayerPage roomId={roomId}/>
}