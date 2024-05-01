import {InputField} from "../../components/InputField.tsx";
import React from "react";
import {usePage} from "../../hooks/usePage.tsx";


type SetNamePageProp = {
  handleSetName: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

export const SetNamePage: React.FC<SetNamePageProp> = ({ name, handleSetName }) => {
  const { setPage} = usePage();


  const handleSubmit = async () => {
    setPage(1);
  }

  return <div className={"p-4 container lock-screen"}>
    <h1 className={"is-size-2 mb-5"}>Please enter your name below.</h1>
    <InputField onChange={handleSetName} label={"What is your name?"} placeholder={"e.g Austin"}/>
    <button className="button is-fullwidth is-info" onClick={handleSubmit} disabled={name.length == 0}>Continue</button>
  </div>
}