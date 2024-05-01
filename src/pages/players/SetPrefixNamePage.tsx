import {InputField} from "../../components/InputField.tsx";
import React from "react";
import "./styles/setPrefixNamePage.css"
import {usePage} from "../../hooks/usePage.tsx";


type SetPrefixNamePageProp = {
  handleSetPrefixName: (event: React.ChangeEvent<HTMLInputElement>) => void
  prefixName: string
  name: string
}
export const SetPrefixNamePage: React.FC<SetPrefixNamePageProp> = ({ handleSetPrefixName, prefixName, name }) => {

  const {setPage} = usePage();
  const handleSubmit = () => {
    setPage(2);
  }

  return <div className={"p-6 container"}>
    <h1 className={"is-size-2 mb-5"}><span className={"has-text-weight-bold has-text-primary"}>{name}</span>, give me 1 adjective to describe last sprint.</h1>
    <h1 className={"is-size-4 mb-5"}>Last sprint i felt <span className={`prefix-holder ${prefixName.length == 0 ? "min-width" : ""}`}>{prefixName}</span></h1>
    <InputField onChange={handleSetPrefixName} label={"How did you felt last sprint?"} placeholder={"e.g productive"}/>
    <button className="button is-fullwidth is-info" onClick={handleSubmit} disabled={prefixName.length == 0}>Continue</button>
  </div>
}