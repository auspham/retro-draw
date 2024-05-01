import { PageContext } from "../../hooks/usePage.tsx";
import React, {useEffect, useState} from "react";
import {SetNamePage} from "./SetNamePage.tsx";
import {RoomContext} from "../../hooks/useRoomId.tsx";
import {SetPrefixNamePage} from "./SetPrefixNamePage.tsx";
import {DrawAvatarPage} from "./DrawAvatarPage.tsx";
import {arrayUnion, doc, onSnapshot, updateDoc} from "firebase/firestore";
import {useFirestore} from "../../hooks/useFireStore.tsx";
import {toast} from "react-toastify";
import {WaitingForOther} from "./WaitingForOther.tsx";
import {capitalise} from "../../utils/StringUtils.ts";
// @ts-expect-error package missing type but still work
import randomColor from "randomcolor"
import { v4 as uuidv4 } from 'uuid';
import {Answer, UserModel} from "../../models/UserModel.tsx";
import {PlayerQuestionPage} from "./PlayerQuestionPage.tsx";



type PlayerPageProp = {
  roomId: string
}
const PlayerPage: React.FC<PlayerPageProp> = ({ roomId }) => {
  const [userId] = useState(uuidv4());
  const [page, setPage] = useState<number>(0);
  const [name, setName] = useState("");
  const [prefixName, setPrefixName] = useState("");
  const [drawing, setDrawing] = useState<string>("")
  const [color, setColor ] = useState<string>('')
  const [nickName, setNickName] = useState('')
  const [answers, setAnswers] = useState<Answer[]>([])
  const [question, setQuestion] = useState('')

  const db = useFirestore();


  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  useEffect(() => {

    setColor(randomColor({
      luminosity: 'dark',
      format: 'rgb'
    }));

    const room = doc(db, "rooms", roomId);
    onSnapshot(room, (data) => {
      const users = data.get("people");
      const currentUser = users.find((user: UserModel) => user.id === userId);
      console.log("answers", currentUser, users, userId);
      if (currentUser.answers.length > answers.length) {
        // show user question;
        setPage(4);
        setQuestion(currentUser.answers[currentUser.answers.length - 1].question);
      }
    })
  },[])

  const handleSetPrefixName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefixName(event.target.value)
  }


  const handleJoinRetro = async () => {
    setPage(3);
    const nickName = capitalise(`${prefixName} ${name}`);
    setNickName(nickName)

    const room = doc(db, "rooms", roomId);
    await updateDoc(room, {
      people: arrayUnion({
        id: userId,
        name: nickName,
        avatar: drawing,
        color: color,
        answers: []
      })
    })

    toast.success("Yay! you're in.")
  }

  return <PageContext.Provider value={{page, setPage}}>
    <RoomContext.Provider value={roomId}>
      {page === 0 && <SetNamePage name={name} handleSetName={handleSetName}/>}
      {page === 1 && <SetPrefixNamePage name={name} prefixName={prefixName} handleSetPrefixName={handleSetPrefixName}/>}
      {page === 2 && <DrawAvatarPage setDrawing={setDrawing} color={color} name={name} handleJoinRetro={handleJoinRetro}/>}
      {page === 3 && <WaitingForOther name={nickName}/>}
      {page === 4 && <PlayerQuestionPage question={question} name={nickName} color={color}/>}
    </RoomContext.Provider>
  </PageContext.Provider>
}

export default PlayerPage;