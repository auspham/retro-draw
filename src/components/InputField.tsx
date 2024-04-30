import React, {ChangeEvent} from "react";

type InputFieldProps = {
  label: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
export const InputField: React.FC<InputFieldProps> = ({ label, onChange }) => {
  return <div className="field">
    <label className="label">{label}</label>
    <div className="control is-expanded">
      <input className="input" type="text" placeholder="e.g What do you feel about the sprint" onChange={onChange}/>
    </div>
  </div>
}