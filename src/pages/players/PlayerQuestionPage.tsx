import {InputField} from "../../components/InputField";
import React, {useState} from "react";
import {DrawCanvas} from "../../components/DrawCanvas.tsx";

type TextAnswerProp = {
  question: string
  handleTextAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleNextAnswer: () => void
  name: string
}

const TextAnswer: React.FC<TextAnswerProp> = ({ name, question, handleTextAnswer, handleNextAnswer }) => {
  return <div className={"p-6 container"}>
    <h1 className={"is-size-3 mb-5"}>
      <span
          className={"has-text-weight-bold has-text-primary is-capitalized"}>{name}</span>, please answer the following question:
    </h1>

    <h1 className={"is-size-3 mb-5"}>{question}</h1>

    <InputField onChange={handleTextAnswer} placeholder={"Type your answer here"} label={"Type your answer"} />
    <button className={"button is-fullwidth is-info"} onClick={handleNextAnswer}>Next</button>
  </div>
}

type DrawAnswerProp = {
  answer: string
  saveImage: (base64: string) => void
  handleSubmitAnswer: () => void
  color: string
  name: string
}

const DrawAnswer: React.FC<DrawAnswerProp> = ({ name, answer, saveImage, color, handleSubmitAnswer }) => {
  return <div className={"p-6 container"}>
    <h1 className={"is-size-3 mb-1"}>Almost done <span
        className={"has-text-weight-bold has-text-primary is-capitalized"}>{name}</span>,</h1>

    <h1 className={"is-size-3 mb-5"}>Now, try your best effort to draw <span
        className={"has-text-weight-bold has-text-danger is-capitalized"}>{answer}</span>.</h1>
    <DrawCanvas saveImage={saveImage} color={color}/>
    <button className="button is-fullwidth is-success" onClick={handleSubmitAnswer}>Submit answer</button>
  </div>
}

type PlayerQuestionPageProp = {
  question: string
  name: string
  color: string
  answerText: string
  handleTextAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDrawAnswer: (base64: string) => void
  handleSubmitAnswer: () => void
}

export const PlayerQuestionPage: React.FC<PlayerQuestionPageProp> = ({name, question, color,  handleDrawAnswer, handleTextAnswer, handleSubmitAnswer, answerText}) => {
  const [ step, setStep ] = useState(0);

  const handleNextAnswer = () => {
    setStep(1);
  }

  return <>
    {step == 0 && <TextAnswer name={name} question={question} handleNextAnswer={handleNextAnswer} handleTextAnswer={handleTextAnswer}/>}
    {step == 1 && <DrawAnswer name={name} color={color} answer={answerText} saveImage={handleDrawAnswer} handleSubmitAnswer={handleSubmitAnswer}/>}
  </>
}



