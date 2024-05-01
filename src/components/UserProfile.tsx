import {UserModel} from "../models/UserModel.tsx";
import "./styles/userProfile.css";

/// <reference types="vite-plugin-svgr/client" />
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Check from "../assets/check.svg?react";

type UserProfileProp = {
  user: UserModel
}
export const UserProfile: React.FC<UserProfileProp> = ({ user }) => {

  return <div className={"user-profile mb-5"}>
    <img src={user.avatar}/>
    <span style={{ color: user.color }}>{user.name}</span>
    {user.answers.length > 0 && user.answers[user.answers.length - 1].answerText && user.answers[user.answers.length - 1].answerText!.length > 0 && <Check fill={user.color}/>}
  </div>
}