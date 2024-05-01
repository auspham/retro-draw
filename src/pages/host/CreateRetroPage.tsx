import {InputField} from "../../components/InputField.tsx";
import React, {Dispatch, useState} from "react";
import {useFirestore} from "../../hooks/useFireStore.tsx";
import {addDoc, collection} from 'firebase/firestore';
import {toast} from "react-toastify";
import {usePage} from "../../hooks/usePage.tsx";

type CreateRetroPageProp = {
  setRoomId: Dispatch<string>
}

const CreateRetroPage: React.FC<CreateRetroPageProp> = ({ setRoomId }) => {
  const [numberOfQuestion, setNumberOfQuestion] = useState(1);
  const [isDisableButtons, setIsDisableButtons] = useState(false);
  const [questions, setQuestion] = useState<string[]>([])
  const { setPage } = usePage();

  const db = useFirestore();

  const addQuestion = () => {
    setNumberOfQuestion((prevState) => prevState + 1)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setQuestion(prevState => {
      const newQuestions = [...prevState];
      newQuestions[i] = event.target.value;
      return newQuestions
    })
  }


  const submit = async (event: React.MouseEvent<HTMLElement>) => {
    const toastId = toast.loading("I'm creating your retro. Please wait...")
    const target = event.target as HTMLElement
    target.classList.add("is-loading");
    setIsDisableButtons(true);

    try {
      const doc = await addDoc(collection(db, "rooms"), {
        questions: questions
      });
      toast.update(toastId, {
        render: "Retro is created. Scan the QR code to join!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false
      })
      setRoomId(doc.id);
      setPage(1);
    } catch (e) {
      console.error(e)
      toast.update(toastId, {
        render: `Unexpected error happened.`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false
      })
    }
  }

  return (
      <>
        <section className={"section full-height is-flex is-flex-direction-column is-justify-content-center"}>
          <h1 className="title">{"Create a retro"}</h1>
              <h2 className="subtitle">
                Fill in the questions belows.
              </h2>

              {Array.from({length: numberOfQuestion}, (_, i) => (
                  <InputField key={i} label={`Question ${i + 1}`} onChange={(e) => handleChange(e, i)}/>
              ))}

              <div className={"buttons"}>
                <button className="button is-fullwidth" onClick={addQuestion}
                        disabled={isDisableButtons || questions.length != numberOfQuestion}>Add another question
                </button>
                <button className="button is-fullwidth is-success" onClick={submit}
                        disabled={isDisableButtons || questions.length == 0}>Submit
                </button>
              </div>
        </section>
      </>
  )
}

export default CreateRetroPage
