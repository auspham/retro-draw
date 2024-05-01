import { LeftUserColumn } from "../../components/LeftUserColumn.tsx";
import { RightUserColumn } from "../../components/RightUserColumn.tsx";
import { PageContext } from "../../hooks/usePage.tsx";
import CreateRetroPage from "./CreateRetroPage.tsx";
import {QRCodePage} from "./QRCodePage.tsx";
import {useEffect, useState} from "react";
import {UserModel} from "../../models/UserModel.tsx";
import {useFirestore} from "../../hooks/useFireStore.tsx";
import {doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import { QuestionPage } from "./QuestionPage.tsx";

const HostPage = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [users, setUser] = useState<UserModel[]>()
  const [questions, setQuestions] = useState<string[]>([])
  const [questionIndex, setQuestionIndex] = useState<number>(0)

  const db = useFirestore();


  useEffect(() => {
    if (roomId) {
      const room = doc(db, "rooms", roomId);
      onSnapshot(room, (data) => {
        setUser(data.get("people"));
      })

      getDoc(room).then(snap => {
        if (snap.exists()) {
          setQuestions(snap.data().questions)
        }
      })
    }
  }, [roomId])

  const handleStartRetro = async () => {
    setPage(2);

    console.log("here", users)
    if (!users) return;

    const userWithQuestions = users.map(user => ({
      ...user,
      answers: [
          ...user.answers,
        {
          question: questions[questionIndex]
        }
      ]
    }));

    console.log("will update users", userWithQuestions)
    const room = doc(db, "rooms", roomId);
    await updateDoc(room, "people", userWithQuestions)
    console.log("done")
  }

  return <PageContext.Provider value={{page, setPage}}>
    <div className={"container full-height"}>
      <div className="columns full-height">
        <div className={"column"}><LeftUserColumn users={users?.filter((_, i) => i % 2 == 0)}/></div>
        <div className={"column is-three-fifths"}>
          {page === 0 && <CreateRetroPage setRoomId={setRoomId}/>}
          {page === 1 && <QRCodePage roomId={roomId} handleStartRetro={handleStartRetro}/>}
          {page === 2 && <QuestionPage question={questions[questionIndex]}/>}
        </div>
        <div className={"column"}><RightUserColumn users={users?.filter((_, i) => i % 2 != 0)}/></div>
      </div>
    </div>
  </PageContext.Provider>
}

export default HostPage;