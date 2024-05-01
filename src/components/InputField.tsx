import React, {ChangeEvent} from "react";

type InputFieldProps = {
  label: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string
}
export const InputField: React.FC<InputFieldProps> = ({ label, onChange, placeholder }) => {
  const placeholderValue = placeholder ? placeholder : "e.g What do you feel about the sprint";
  return <div className="field">
    <label className="label">{label}</label>
    <div className="control is-expanded">
      <input className="input" type="text" placeholder={placeholderValue} onChange={onChange}/>
    </div>
  </div>
}