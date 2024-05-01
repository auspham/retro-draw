import {usePage} from "../../hooks/usePage.tsx";

type QuestionPageProp = {
  question: string
}
export const QuestionPage: React.FC<QuestionPageProp> = ({ question }) => {
  const { setPage } = usePage();

  const handleShowAnswer = () => {
    setPage(3);
  }

  return <section className={"section full-height has-text-centered is-flex-direction-column is-align-items-center is-flex is-justify-content-center"}>
    <h1 className={"is-size-2"}>{question}</h1>
    <button className={"button is-fullwidth mt-5"} onClick={handleShowAnswer}>Show answer</button>
  </section>
}