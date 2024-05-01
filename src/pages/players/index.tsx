import { PageContext } from "../../hooks/usePage.tsx";
import React, {useState} from "react";
import {SetNamePage} from "./SetNamePage.tsx";
import {RoomContext} from "../../hooks/useRoomId.tsx";
import {SetPrefixNamePage} from "./SetPrefixNamePage.tsx";
import {DrawAvatarPage} from "./DrawAvatarPage.tsx";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {useFirestore} from "../../hooks/useFireStore.tsx";
import {toast} from "react-toastify";
import {WaitingForOther} from "./WaitingForOther.tsx";
import {capitalise} from "../../utils/StringUtils.ts";


type PlayerPageProp = {
  roomId: string
}
const PlayerPage: React.FC<PlayerPageProp> = ({ roomId }) => {
  const [page, setPage] = useState<number>(0);
  const [name, setName] = useState("");
  const [prefixName, setPrefixName] = useState("");
  const [drawing, setDrawing] = useState<string>("")
  const db = useFirestore();

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSetPrefixName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixName(event.target.value)
  }


  const handleJoinRetro = async () => {
    setPage(3);

    const room = doc(db, "rooms", roomId);
    await updateDoc(room, {
      people: arrayUnion({
        name: capitalise(`${prefixName} ${name}`),
        avatar: drawing
      })
    })

    toast.success("Yay! you're in.")
  }

  return <PageContext.Provider value={{page, setPage}}>
    <RoomContext.Provider value={roomId}>
      {page === 0 && <SetNamePage name={name} handleSetName={handleSetName}/>}
      {page === 1 && <SetPrefixNamePage name={name} prefixName={prefixName} handleSetPrefixName={handleSetPrefixName}/>}
      {page === 2 && <DrawAvatarPage setDrawing={setDrawing} name={name} handleJoinRetro={handleJoinRetro}/>}
      {page === 3 && <WaitingForOther name={name} prefixName={prefixName}/>}
    </RoomContext.Provider>
  </PageContext.Provider>
}

export default PlayerPage;