import { PageContext } from "../../hooks/usePage.tsx";
import React, {useEffect, useRef, useState} from "react";
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
import {UserModel} from "../../models/UserModel.tsx";
import {PlayerQuestionPage} from "./PlayerQuestionPage.tsx";
import {Unsubscribe} from "@firebase/firestore";



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
  const [numberOfQuestionAnswered, setNumberOfQuestionAnswered] = useState<number>(0)
  const [question, setQuestion] = useState('')
  const [users, setUsers] = useState<UserModel[]>()
  const [ answerDrawing, setAnswerDrawing] = useState<string>('');
  const [ answerText, setAnswerText ] = useState<string>('');

  const db = useFirestore();

  const unsubscribe = useRef<Unsubscribe | undefined>(undefined);

  const handleTextAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerText(event.target.value);
  }

  const handleDrawAnswer = (base64: string) => {
    setAnswerDrawing(base64)
  }

  const handleSubmitAnswer = async () => {
    const room = doc(db, "rooms", roomId);
    if (!users) return;

    users.forEach(user => {
      if (user.id === userId) {
        console.log("found user", user)
        user.answers[user.answers.length - 1].answerText = answerText
        user.answers[user.answers.length - 1].answerImage = answerDrawing
      }
    })
    //
    await updateDoc(room, "people", users)

    setNumberOfQuestionAnswered(prevState => prevState + 1);
    console.log("updated");
  }

  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  useEffect(() => {
    setColor(randomColor({
      luminosity: 'dark',
      format: 'rgb'
    }));
  }, []);

  useEffect(() => {

    if (unsubscribe.current) { unsubscribe.current(); }

    const room = doc(db, "rooms", roomId);
    unsubscribe.current = onSnapshot(room, (data) => {
      const users = data.get("people");

      setUsers(users)

      const currentUser = users.find((user: UserModel) => user.id === userId);

      console.log("users", users, "data", data, currentUser.answers.length, numberOfQuestionAnswered)
      if (currentUser.answers.length > numberOfQuestionAnswered) {
        // show user question;
        setPage(4);
        setQuestion(currentUser.answers[currentUser.answers.length - 1].question);
      } else {
        console.log("goes here?")
        setPage(3);
      }
    })
  },[numberOfQuestionAnswered])

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
      {page === 4 && <PlayerQuestionPage
          question={question}
          name={nickName}
          color={color}
          answerText={answerText}
          handleSubmitAnswer={handleSubmitAnswer}
          handleTextAnswer={handleTextAnswer}
          handleDrawAnswer={handleDrawAnswer}/>}
    </RoomContext.Provider>
  </PageContext.Provider>
}

export default PlayerPage;