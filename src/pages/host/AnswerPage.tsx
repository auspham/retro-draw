import {UserModel} from "../../models/UserModel.tsx";
import {useState} from "react";
import {usePage} from "../../hooks/usePage.tsx";

type AnswerPageProp = {
  users?: UserModel[]
  questionIndex: number
  questions: string[]
}
export const AnswerPage: React.FC<AnswerPageProp> = ({ users, questions, questionIndex }) => {

  const [currentUser, setCurrentUser] = useState<number>(0);

  const [answerReveal, setAnswerReveal] = useState<string>();

  const { setPage } = usePage();

  if (!users) return;

  const user = users[currentUser];

  const handleNext = () => {
    if (currentUser == users.length - 1) {
      // show summary
      setPage(4);
      return;
    }
    setAnswerReveal('')
    setCurrentUser(prevState => prevState + 1);
  }




  const handleRevealAnswer = () => {
    setAnswerReveal(user.answers[questionIndex].answerText)
  }

  return <section
      className={"section full-height has-text-centered is-flex-direction-column is-align-items-center is-flex is-justify-content-center"}>
    <h1 className={"is-size-2 mb-5"}>{questions[questionIndex]}</h1>


    {!answerReveal ?
    <h1 className={"is-size-4"}>
      Everyone guess the answer of our artist <span className={"has-text-weight-bold"}
                                                    style={{color: user.color}}>{user.name}</span>
    </h1> :
    <h1 className={"is-size-4"}>
      The answer is <span className={"has-text-weight-bold"} style={{color: user.color}}>{answerReveal}</span>
    </h1>}

    <img src={user.answers[questionIndex].answerImage}/>

    <button className={"button is-fullwidth is-info"} onClick={handleRevealAnswer}>Reveal answer</button>

    <button className={"button is-fullwidth mt-5"} onClick={handleNext}>
      {currentUser == users.length - 1 ? "Show summary" : "Next Answer"}
    </button>
  </section>
}