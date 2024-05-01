import {UserModel} from "../../models/UserModel.tsx";
import React from "react";
import "./styles/summaryPage.css"

type SummaryPageProp = {
  users?: UserModel[]
  questionIndex: number
  questions: string[]
  handleNextQuestion: () => void
}
export const SummaryPage: React.FC<SummaryPageProp> = ({ users, questionIndex, questions, handleNextQuestion}) => {
  if (!users) return;

  return <section className={"section summary-page full-height full-width"}>
    <h1 className={"is-size-3 mb-5"}>Summary</h1>
    <div className={"columns"} style={{ gap: "1rem" }}>
      <div className={"column has-background-grey has-radius-large is-one-fifth"}></div>
      {questions.map((question, i) =>
        <div className={"column has-background-primary has-radius-large"}>
          <p className="bd-notification is-primary has-text-weight-bold">{ i <= questionIndex ? question : "Hidden question"}</p>
        </div>
      )}

    </div>
        {users.map(user => {
          return <div className={"columns has-text-white"} style={{gap: "1rem", borderBottom: "2px solid #000"}}>
            <div className={"column has-radius-large is-one-fifth is-flex is-align-items-center has-text-weight-bold has-text-centered"} style={{ color: user.color }}>
              <img src={user.avatar} width={150} height={150}/>
              {user.name}
            </div>
            {user.answers.map((ans, i) => {
              if (i > questionIndex) return;
              return <div className={"column has-radius-large is-flex is-align-items-center is-justify-content-space-evenly"} style={{ color: user.color }}>
                <img src={ans.answerImage} style={{ maxWidth: 150 }}/>
                <p className="has-text-weight-bold is-primary">{ans.answerText}</p>
              </div>
            })}

            {questions.map((_, i) => {
              if (i <= questionIndex) return;
              return <div className={"column"}></div>
            })}
          </div>
        })}

    {questionIndex < questions.length - 1 && <button className={"button is-fullwidth is-info"} onClick={handleNextQuestion}>Continue to next question</button>}
  </section>
}